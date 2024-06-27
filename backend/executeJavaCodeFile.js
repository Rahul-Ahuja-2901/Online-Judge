const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");
const { exec } = require("child_process");

const dirOutputs = path.join(__dirname, "outputs");
if (!fs.existsSync(dirOutputs)) {
  fs.mkdirSync(dirOutputs, { recursive: true });
}

const executeJavaCodeFile = async (codeFilePath, inputFilePath) => {

  let executeCommand = `java ${codeFilePath} `;
  if (inputFilePath != null) {
    executeCommand += `< ${inputFilePath} `;
  }

  return new Promise((resolve, reject) => {
    exec(executeCommand, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      if (stderr) {
        reject(stderr);
      }
      resolve(stdout);
    });
  });
};

module.exports = {
    executeJavaCodeFile,
};
