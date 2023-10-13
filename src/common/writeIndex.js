const fs = require("fs");
const path = require("path");

const writeIndex = async (folderPath) => {
  if (!fs.existsSync(folderPath)) return false;

  const files = fs.readdirSync(folderPath);
  const file = `${folderPath}/index.js`;

  // New content
  let contentFile = "";
  let moduleItems = "";
  files.forEach((elem) => {
    if (elem !== "index.js")
      if (path.extname(elem) === ".js")
        moduleItems += `...require('./${elem}'),`;
      else moduleItems += `${elem}: require('./${elem}'),`;
  });
  contentFile += `module.exports = {${moduleItems}}`;

  await fs.promises.writeFile(file, contentFile, (err) => {
    if (err) throw new Error(err);
    return null;
    // file written successfully
  });
  return true;
};

module.exports = {
  writeIndex
};
