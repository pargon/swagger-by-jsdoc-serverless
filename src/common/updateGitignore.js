const path = require("path");
const fs = require("fs").promises;

module.exports = {
  updateGitignore: async () => {
    const localPath = process.cwd();
    const gitignorePath = path.join(localPath, ".gitignore");
    const textToAdd = `
# Swagger by jsdoc serverless
swagger/*/*
!swagger/components/schemas/
tmp/*.json
`;
    await fs.appendFile(gitignorePath, textToAdd, (err) => {
      if (err) throw new Error(err);
    });
  }
};
