/* eslint-disable no-eval, max-len */
const fse = require("fs-extra");

const copyDefaultSpec = async (sourcePath, destinyPath) => {
  try {
    if (!fse.existsSync(destinyPath))
      fse.mkdirSync(destinyPath, { recursive: true });

    fse.copySync(sourcePath, destinyPath, { overwrite: false });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  copyDefaultSpec
};
