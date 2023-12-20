const fs = require("fs");

const createJsonFile = async (filePath, fileName, jsonFunction, overwrite) => {
  try {
    if (!fs.existsSync(filePath)) fs.mkdirSync(filePath, { recursive: true });

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
  } catch (error) {
    throw new Error(
      `Error en file: ${filePath} ${fileName} ${jsonFunction} ${overwrite}`
    );
  }
};

const writeMultiSchemaFile = async (
  filePath,
  fileName,
  exceptions,
  jsonFunction,
  overwrite
) => {
  try {
    if (!fs.existsSync(filePath)) fs.mkdirSync(filePath, { recursive: true });

    const file = `${filePath}/${fileName}.js`;
    if (!fs.existsSync(file) || overwrite) {
      const jsonModule = {};
      jsonModule[fileName] = jsonFunction;

      if (Array.isArray(exceptions)) {
        exceptions.forEach((element) => {
          const key = `${fileName}Error${element.type.names[0]}`;
          jsonModule[key] = jsonFunction;
        });
      }
      const jsonStr = `module.exports =${JSON.stringify(jsonModule)}`;
      await fs.promises.writeFile(file, jsonStr, (err) => {
        if (err) throw new Error(err);
        return null;
        // file written successfully
      });
    }
  } catch (error) {
    throw new Error(
      `Error en file: ${filePath} ${fileName} ${jsonFunction} ${overwrite}`
    );
  }
};

module.exports = { createJsonFile, writeMultiSchemaFile };
