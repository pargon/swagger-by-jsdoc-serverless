const fs = require("fs").promises;
const { copyDefaultSpec } = require("./copyDefaultSpec");
const { getFunctionsFromServerless } = require("./getFunctionsFromServerless");
const { getMetadataFunction } = require("./getMetadataFunction");
const { getJsonFunction } = require("./getJsonFunction");
const { writeFilesFunctions } = require("./writeFilesFunctions");
const { writeHtmlFromJson } = require("./writeHtmlFromJson");
const { writeIndex } = require("./writeIndex");
const { updateGitignore } = require("./updateGitignore");
const { updatePackJson } = require("./updatePackJson");

const writeFile = async (jsonStr, path) => {
  await fs.writeFile(path, jsonStr, "utf8", (err) => {
    if (err) throw new Error(err);
  });
};

module.exports = {
  copyDefaultSpec,
  getFunctionsFromServerless,
  getMetadataFunction,
  getJsonFunction,
  writeFilesFunctions,
  writeHtmlFromJson,
  writeIndex,
  updateGitignore,
  updatePackJson,
  writeFile
};
