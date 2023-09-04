const fs = require("fs");
const { getJsonFunction } = require("./getJsonFunction");

const writeFilesFunctions = async (
  functions,
  target,
  parametersPath,
  requestBodiesPath,
  schemasPath,
  responsesPath,
  fileDelete,
  tags
) => {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
  }
  await functions.forEach(async (func) => {
    const file = `${target}/${func.detail[0].name}.js`;
    if (fileDelete || !fs.existsSync(file)) {
      const jsonFunction = getJsonFunction(
        func,
        parametersPath,
        requestBodiesPath,
        schemasPath,
        responsesPath,
        tags
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
  return tags;
};

module.exports = {
  writeFilesFunctions
};
