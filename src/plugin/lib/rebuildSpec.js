const path = require("path");
const {
  getFunctionsFromServerless,
  getMetadataFunction,
  writeFilesFunctions,
  writeIndex,
  getTagsInFile,
} = require("./utils");

async function rebuildSpec(fileDelete) {
  
  const componentsPath = path.join(__dirname, "specs/components");
  const functionsPath = path.join(__dirname, "specs/functions");
  const schemasPath = path.join(componentsPath, "/schemas");
  const parametersPath = path.join(componentsPath, "/parameters");
  const requestBodiesPath = path.join(componentsPath, "/requestBodies");
  const responsesPath = path.join(componentsPath, "/responses");
  const tagsPath = path.join(__dirname, "specs/tags.js");
  const serverlessPath = path.join(
    __dirname,
    "../".repeat(3),
    "serverless.yml"
  );

  const tags = await getTagsInFile(tagsPath);
  const functions = await getFunctionsFromServerless(serverlessPath);
  const functions2 = await getMetadataFunction(functions);
  await writeFilesFunctions(    functions2,    functionsPath,    parametersPath,    requestBodiesPath,
    schemasPath,
    responsesPath,
    fileDelete,
    tags
  );
  await writeIndex(functionsPath);
  await writeIndex(parametersPath);
  await writeIndex(requestBodiesPath);
  await writeIndex(responsesPath);
  await writeIndex(schemasPath);
  await writeIndex(componentsPath);
}

async function eject() {  await rebuildSpec(true);}

async function rebuild() {
  const fileDelete = process.argv[2] === "d"; // delete files function spec
  await rebuildSpec(fileDelete);
}

module.exports = { eject, rebuild };
