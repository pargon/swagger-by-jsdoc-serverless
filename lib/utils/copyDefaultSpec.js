/* eslint-disable no-eval, max-len */
const fse = require("fs-extra");

const copyDefaultSpec = async (specDefaultPath, specPath) => {
  try {
    if (!fse.existsSync(specPath)) fse.mkdirSync(specPath, { recursive: true });

    fse.copySync(specDefaultPath, specPath, { overwrite: false });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  copyDefaultSpec
};
