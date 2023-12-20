const {
  getFunctionsFromServerless,
  getMetadataFunction,
  writeFilesFunctions,
  writeIndex
} = require("../common");

async function specJson(overwrite) {
  const functions = await getFunctionsFromServerless(
    process.env.SWAGGERSRVLESSPATH
  );

  const resultMetadata = await getMetadataFunction(functions);
  await writeFilesFunctions(
    resultMetadata.functions,
    process.env.SWAGGERFUNCPATH,
    process.env.SWAGGERPARAMPATH,
    process.env.SWAGGERREQPATH,
    process.env.SWAGGERSCHEMAPATH,
    process.env.SWAGGERRESPPATH,
    overwrite
  );
  await writeIndex(process.env.SWAGGERFUNCPATH);
  await writeIndex(process.env.SWAGGERPARAMPATH);
  await writeIndex(process.env.SWAGGERREQPATH);
  await writeIndex(process.env.SWAGGERRESPPATH);
  await writeIndex(process.env.SWAGGERSCHEMAPATH);
  await writeIndex(process.env.SWAGGERCOMPPATH);
}

async function eject() {
  await specJson(true);
}

module.exports = { eject };
