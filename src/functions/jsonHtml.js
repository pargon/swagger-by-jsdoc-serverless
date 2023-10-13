/* eslint-disable import/no-dynamic-require, global-require */
const { writeHtmlFromJson, writeFile } = require("../common");

async function eject() {
  try {
    const docsJson = require(process.env.SWAGGERSPECPATH);
    const jsonStr = JSON.stringify(docsJson);    
    await writeHtmlFromJson(jsonStr, process.env.SWAGGERFILEWRITETMP);
    await writeFile(jsonStr, `${process.env.SWAGGERFILEWRITETMP}/index.json`);
  } catch (error) {
    throw new Error(error);
  }
}
module.exports = { eject };
