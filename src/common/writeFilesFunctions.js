const fs = require("fs");
const { getJsonFunction } = require("./getJsonFunction");

const writeFilesFunctions = async (
  functions,
  target,
  paramPath,
  reqBodiesPath,
  filePath,
  respPath,
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
        paramPath,
        reqBodiesPath,
        filePath,
        respPath
      );
      const jsonStr = `module.exports = ${JSON.stringify(jsonFunction)}`;

      await fs.promises.writeFile(file, jsonStr, (err) => {
        if (err) throw new Error(err);

        return null;
        // file written successfully
      });
    }
  });
};

module.exports = {
  writeFilesFunctions
};
