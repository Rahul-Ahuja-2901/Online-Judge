const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const { DBConnection } = require("./database/db");
const user = require("./model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { generateCodeFile } = require("./generateCodeFile");
const { generateInputFile } = require("./generateInputFile");
const { executeCppCodeFile } = require("./executeCppCodeFile");
const { executeJavaCodeFile } = require("./executeJavaCodeFile");
const { executePythonCodeFile } = require("./executePythonCodeFile");
const problem = require("./model/problem");

const app = express();

const PORT = process.env.PORT || 8080;

DBConnection();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const executeCodeFile = async (language, codeFilePath, inputFilePath) => {
  let output = '';

  switch (language) {
    case 'cpp':
      output = await executeCppCodeFile(codeFilePath, inputFilePath);
      break;
    case 'java':
      output = await executeJavaCodeFile(codeFilePath, inputFilePath);
      break;
    case 'py':
      output = await executePythonCodeFile(codeFilePath, inputFilePath);
      break;
    default:
      throw new Error('Unsupported language');
  }

  return output.trim();
};

app.get("/", (req, res) => {
  res.send("Welcome To Online Judge");
});

app.post("/register", async (req, res) => {
  //res.send("Register Page");

  try {
    //Step 1 - Get the user data from Frontend
    const { firstName, lastName, email, password } = req.body;

    //Step 2 - Check for any missing data (Validation)
    if (!firstName || !lastName || !email || !password) {
      return res
        .status(404)
        .json({ message: "Data Missing - Data Fields can't be empty." });
    }

    //Step 3 - Check if the user already exists in the Database
    const doesUserExists = await user.findOne({ email });
    if (doesUserExists) {
      return res
        .status(404)
        .json({ message: "User with this email already exists." });
    }

    //Step 4 - Encrypt the user password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Step 5 - Save the user data in Database
    const userData = await user.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    //Step 6 - Generate a token for user and send it
    const token = jwt.sign(
      { id: userData._id, email },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    userData.token = token;
    userData.password = undefined;

    return res.status(200).json("You have successfully registered!");
  } catch (error) {
    console.log("Error: " + error.message);
  }
});

app.post("/login", async (req, res) => {
  //res.send("Login Page");

  try {
    //Step 1 - Get the user data from Frontend
    const { email, password } = req.body;

    //Step 2 - Check for any missing data (Validation)
    if (!email || !password) {
      return res
        .status(404)
        .json({ message: "Data Missing - Data Fields can't be empty." });
    }

    //Step 3 - Check if the user exists in the Database
    const userData = await user.findOne({ email });
    if (!userData) {
      return res
        .status(404)
        .json({ message: "User with this email does not exists." });
    }

    //Step 4 - Match the password
    const enteredPassword = await bcrypt.compare(password, userData.password);
    if (!enteredPassword) {
      return res.status(404).json({ message: "Password is incorrect." });
    }

    //Step 5 - Create jwt token for checking authorization
    const token = jwt.sign(
      { id: userData._id, email },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    userData.token = token;
    userData.password = undefined;

    //Step 6 - Store cookies into the browser
    const cookieOptions = {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      httpOnly: true, //can only be manipulated by the server and not by the client or user or frontend
    };

    //Step 7 - Send the token
    res.status(200).cookie("token", token, cookieOptions).json({
      message: "You have successfully logged in!",
      success: true,
      token,
    });
  } catch (error) {
    console.log("Error: " + error.message);
  }
});

app.post("/run", async (req, res) => {
  //const language = req.body.language;
  //const code = req.body.code;

  const { language, code, input } = req.body;
  if (!language) {
    return res.send("Please select language.");
  }
  if (!code) {
    return res.send("Error - Code is missing.");
  }

  try {
    const codeFilePath = await generateCodeFile(language, code);
    let inputFilePath = null;
    if (input) {
      inputFilePath = await generateInputFile(input, codeFilePath);
    }
    const output = await executeCodeFile(language, codeFilePath, inputFilePath);
    res.send(output);
  } catch (error) {
    return res.status(404).json({ error: error });
  }
});

app.post("/add-problem", async (req, res) => {
  //res.send("Add Problem Page");

  try {
    //Step 1 - Get all the details of the problem from Frontend
    const {
      problemName,
      problemStatement,
      constraints,
      problemDifficulty,
      problemTags,
      sampleInput,
      sampleOutput,
      privateInput,
      privateOutput,
    } = req.body;

    //Step 2 - Check for any missing data (Validation)
    if (
      !problemName ||
      !problemStatement ||
      !constraints ||
      !problemDifficulty ||
      !problemTags ||
      !sampleInput ||
      !sampleOutput ||
      !privateInput ||
      !privateOutput
    ) {
      return res.send("Data Missing - Data Fields can't be empty.");
    }

    //Step 3 - Save the problem data in Database
    const problemData = await problem.create({
      problemName,
      problemStatement,
      constraints,
      problemDifficulty,
      problemTags,
      sampleInput,
      sampleOutput,
      privateInput,
      privateOutput,
    });

    return res.send("Problem has been added successfully!");
  } catch (error) {
    console.log("Error: " + error.message);
  }
});

app.get("/get-all-problems", async (req, res) => {
  try {
    const problems = await problem.find({});
    res.json(problems);
  } catch (error) {
    res.send("Error fetching problems");
  }
});

app.post("/get-problem", async (req, res) => {
  try {
    const problemId = req.body.id;
    const problemData = await problem.findById(problemId);
    if (!problemData) {
      return res.send("Problem not found");
    }
    res.json(problemData);
  } catch (error) {
    console.error("Error fetching problem:", error);
    res.send("Internal server error");
  }
});

app.post('/submit', async (req, res) => {
  const { id, code, language } = req.body;

  if (!language) {
    return res.send("Error - Please select language.");
  }
  if (!code) {
    return res.send("Error - Code is missing.");
  }

  try {
    const requiredProblem = await problem.findById(id);
    if (!requiredProblem) {
      return res.send("Problem not found");
    }

    const codeFilePath = await generateCodeFile(language, code);
    const inputFilePath = await generateInputFile(requiredProblem.privateInput, codeFilePath);;
    const output = await executeCodeFile(language, codeFilePath, inputFilePath);

    // Compare output with expected privateOutputTestCase
    if (output.trim() === requiredProblem.privateOutput.trim()) {
      return res.send("Accepted");
    } else {
      return res.send("Wrong Answer");
    }
  } catch (error) {
    return res.status(404).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log("Server listening on PORT " + PORT);
});
