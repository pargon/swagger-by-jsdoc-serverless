/* eslint-disable import/no-dynamic-require, global-require */
const path = require("path");
const { writeHtmlFromJson, writeFile } = require("./utils");

async function eject() {
  const localPath = process.cwd();
  const pathSpec = path.join(localPath, process.env.SPECDIRNAME);
  try {
    const fileWritePath = process.env.FILEWRITETMP;
    const docsJson = require(pathSpec);
    const jsonStr = JSON.stringify(docsJson);
    await writeHtmlFromJson(jsonStr, fileWritePath);
    await writeFile(jsonStr, `./${fileWritePath}/doc.json`);
  } catch (error) {
    throw new Error(error);
  }
}
module.exports = { eject };
