const path = require("path");
const {
  copyDefaultSpec,
  getFunctionsFromServerless,
  getMetadataFunction,
  writeFilesFunctions,
  writeIndex
} = require("./utils");

const COMPONENTS = "components";
const FUNCTIONS = "functions";
const SCHEMAS = "schemas";
const PARAMETERS = "parameters";
const REQUESTBODIES = "requestBodies";
const RESPONSES = "responses";

async function specJson(fileDelete) {
  const localPath = process.cwd();  
  const serverlessPath = process.env.SERVERLESSPATH;
  
  const specPath = path.join(localPath, process.env.SPECDIRNAME);
  const specDefaultPath = path.join(__dirname, process.env.SPECDEFAULT);
  const componentsPath = path.join(specPath, COMPONENTS);
  const functionsPath = path.join(specPath, FUNCTIONS);
  const schemasPath = path.join(componentsPath, SCHEMAS);
  const parametersPath = path.join(componentsPath, PARAMETERS);
  const requestBodiesPath = path.join(componentsPath, REQUESTBODIES);
  const responsesPath = path.join(componentsPath, RESPONSES);

  await copyDefaultSpec(specDefaultPath, specPath);
  const functions = await getFunctionsFromServerless(serverlessPath);
  const resultMetadata = await getMetadataFunction(functions);

  await writeFilesFunctions(
    resultMetadata.functions,
    functionsPath,
    parametersPath,
    requestBodiesPath,
    schemasPath,
    responsesPath,
    fileDelete
  );
  await writeIndex(functionsPath);
  await writeIndex(parametersPath);
  await writeIndex(requestBodiesPath);
  await writeIndex(responsesPath);
  await writeIndex(schemasPath);
  await writeIndex(componentsPath);
}

async function eject() {
  await specJson(true);
}

module.exports = { eject };
