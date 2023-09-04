/* eslint-disable global-require */
const { writeHtmlFromJson, writeFile } = require("./utils");

async function eject() {
  try {
    const docsJson = require("./specs");
    const jsonStr = JSON.stringify(docsJson);
    await writeHtmlFromJson(jsonStr, "tmp");
    await writeFile(jsonStr, "./tmp/doc.json");

  } catch (error) {
    throw new Error(error);
  }
}
module.exports = { eject };
