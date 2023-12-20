/* eslint-disable no-await-in-loop, no-restricted-syntax, guard-for-in */
const fs = require("fs");
const { getJsonFunction } = require("./getJsonFunction");

const writeFilesFunctions = async (
  functions,
  target,
  paramPath,
  reqBodiesPath,
  schemaPath,
  respPath,
  overwrite
) => {
  if (!fs.existsSync(target)) fs.mkdirSync(target, { recursive: true });

  for (let index = 0; index < functions.length; index++) {
    const func = functions[index];
    const file = `${target}/${func.detail[0].name}.js`;
    if (!fs.existsSync(file) || overwrite) {
      const jsonFunction = await getJsonFunction(
        func,
        paramPath,
        reqBodiesPath,
        schemaPath,
        respPath
      );
      const jsonStr = `module.exports = ${JSON.stringify(jsonFunction)}`;

      await fs.promises.writeFile(file, jsonStr, (err) => {
        if (err) throw new Error(err);

        return null;
        // file written successfully
      });
    }
  }
};

module.exports = {
  writeFilesFunctions
};
