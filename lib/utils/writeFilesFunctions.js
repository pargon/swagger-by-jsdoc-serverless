const fs = require("fs");
const { getJsonFunction } = require("./getJsonFunction");

const writeFilesFunctions = async (
  functions,
  target,
  parametersPath,
  requestBodiesPath,
  schemasPath,
  responsesPath,
  overwrite
) => {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }
  await functions.forEach(async (func) => {
    const file = `${target}/${func.detail[0].name}.js`;
    if (!fs.existsSync(file) || overwrite) {
      const jsonFunction = getJsonFunction(
        func,
        parametersPath,
        requestBodiesPath,
        schemasPath,
        responsesPath
      );
      const jsonStr = `module.exports = ${JSON.stringify(jsonFunction)}`;

      await fs.promises.writeFile(file, jsonStr, (err) => {
        if (err) {
          throw new Error(err);
        }
        return null;
        // file written successfully
      });
    }
  });
};

module.exports = {
  writeFilesFunctions
};
