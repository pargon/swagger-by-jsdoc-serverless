// list-scripts.js
const scriptsConfig = require("./scripts-config");

console.log("Scripts:");
for (const scriptName in scriptsConfig) {
  console.log(`- ${scriptName}`);
}

process.exit();
