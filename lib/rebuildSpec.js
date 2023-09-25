const path = require("path");
const {
  copyDefaultSpec,
  getFunctionsFromServerless,
  getMetadataFunction,
  writeFilesFunctions,
  writeIndex,
  getTagsInFile
} = require("./utils");

const COMPONENTS = "components";
const FUNCTIONS = "functions";
const SCHEMAS = "schemas";
const PARAMETERS = "parameters";
const REQUESTBODIES = "requestBodies";
const RESPONSES = "responses";

async function rebuildSpec(fileDelete) {
  const specPath = process.env.SPECDIRNAME;
  const specDefaultPath = process.env.SPECDEFAULT;
  const serverlessPath = process.env.SERVERLESSPATH;

  const componentsPath = path.join(specPath, COMPONENTS);
  const functionsPath = path.join(specPath, FUNCTIONS);
  const schemasPath = path.join(componentsPath, SCHEMAS);
  const parametersPath = path.join(componentsPath, PARAMETERS);
  const requestBodiesPath = path.join(componentsPath, REQUESTBODIES);
  const responsesPath = path.join(componentsPath, RESPONSES);
  const tagsPath = path.join(specPath, "tags.js");

  await copyDefaultSpec(specDefaultPath, specPath);
  const tags = await getTagsInFile(tagsPath);
  const functions = await getFunctionsFromServerless(serverlessPath);
  const functions2 = await getMetadataFunction(functions);
  await writeFilesFunctions(
    functions2,
    functionsPath,
    parametersPath,
    requestBodiesPath,
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

async function eject() {
  await rebuildSpec(true);
}

async function rebuild() {
  const fileDelete = process.argv[2] === "d"; // delete files function spec
  await rebuildSpec(fileDelete);
}

module.exports = { eject, rebuild };
