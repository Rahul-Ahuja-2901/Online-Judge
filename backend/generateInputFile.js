const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const dirInputs = path.join(__dirname, "inputs");
if (!fs.existsSync(dirInputs)) {
  fs.mkdirSync(dirInputs, { recursive: true });
}

const generateInputFile = async (content, codeFilePath) => {
  const jobID = path.basename(codeFilePath).split(".")[0];
  const fileName = `${jobID}.txt`;
  const filePath = path.join(dirInputs, fileName);
  await fs.writeFileSync(filePath, content);
  return filePath;
};

module.exports = {
  generateInputFile,
};
