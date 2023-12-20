/* eslint-disable import/no-dynamic-require, global-require */
const path = require("path");
const fs = require("fs");

module.exports = {
  updatePackJson: async () => {
    const localPath = process.cwd();
    const packJsonPath = path.join(localPath, "package.json");
    const packJson = require(packJsonPath);

    let key = "swagger-spec";
    let value = "node -r swagger-by-jsdoc-serverless/scripts/spec.js > NUL";
    packJson.scripts[key] = value;
    key = "swagger-html";
    value = "node -r swagger-by-jsdoc-serverless/scripts/html.js > NUL";
    packJson.scripts[key] = value;

    const jsonStr = JSON.stringify(packJson);

    fs.writeFileSync(packJsonPath, jsonStr, "utf8", (err) => {
      if (err) throw new Error(err);
    });
  }
};
