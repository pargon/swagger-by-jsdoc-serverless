/* eslint-disable no-eval, max-len */
const fs = require("fs");

const getTagsInFile = async (filePath) => {
  try {
    if (!fs.existsSync(filePath)) return [];

    const content = fs.readFileSync(filePath, "utf-8");
    const moduleExports = {};
    const moduleWrapper = `(function(module, exports) { ${content} })(moduleExports, moduleExports);`;
    eval(moduleWrapper);
    const array = moduleExports.exports.tags.map((tag) => tag.name);
    return array;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getTagsInFile
};
