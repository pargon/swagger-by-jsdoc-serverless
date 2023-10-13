const fs = require("fs");

const createJsonFile = async (
  filePath,
  fileName,
  jsonFunction,
  overwrite
) => {
  if (!fs.existsSync(filePath))
    fs.mkdirSync(filePath, { recursive: true });

  const file = `${filePath}/${fileName}.js`;
  if (!fs.existsSync(file) || overwrite) {
    const jsonStr = `module.exports = {"${fileName}": ${JSON.stringify(
      jsonFunction
    )}}`;

    await fs.promises.writeFile(file, jsonStr, (err) => {
      if (err) throw new Error(err);
      return null;
      // file written successfully
    });
  }
};

module.exports = { createJsonFile };
