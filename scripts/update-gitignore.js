const path = require("path");
const fs = require("fs");

const localPath = process.cwd();
const gitignorePath = path.join(localPath, ".gitignore");
const textToAdd = `
# Swagger by jsdoc serverless
swagger/components/parameters/*
swagger/components/requestBodies/*
swagger/components/responses/*
swagger/components/*.*
swagger/functions/*
tmp/*.json
`;

fs.appendFile(gitignorePath, textToAdd, (err) => {
  if (err) throw new Error(err);
});
