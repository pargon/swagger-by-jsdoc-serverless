/* eslint-disable import/no-dynamic-require, global-require */
const path = require("path");
const fs = require("fs").promises;

module.exports = {
  updatePackJson: async () => {
    const localPath = process.cwd();
    const packJsonPath = path.join(localPath, "package.json");
    const packJson = require(packJsonPath);

    let key = "swagger-spec";
    let value = "node -r swagger-by-jsdoc-serverless/scripts/spec.js";
    packJson.scripts[key] = value;
    key = "swagger-html";
    value = "node -r swagger-by-jsdoc-serverless/scripts/html.js";
    packJson.scripts[key] = value;

    const jsonStr = JSON.stringify(packJson);
console.log(jsonStr);
    await fs.appendFile(packJsonPath, jsonStr, (err) => {
      if (err) throw new Error(err);
    });
  }
};
