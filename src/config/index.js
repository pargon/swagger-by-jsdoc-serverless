const path = require("path");

function eject() {
  const COMPONENTS = "components";
  const FUNCTIONS = "functions";
  const SCHEMAS = "schemas";
  const PARAMETERS = "parameters";
  const REQUESTBODIES = "requestBodies";
  const RESPONSES = "responses";

  const localPath = process.cwd();

  process.env.SWAGGERLOCALPATH = localPath;
  process.env.SWAGGERSRVLESSPATH = "serverless.yml";
  process.env.SWAGGERSPECDIRNAME = "swagger";
  process.env.SWAGGERFILEWRITETMP = path.join(localPath, "tmp");
  process.env.SWAGGERSPECPATH = path.join(
    localPath,
    process.env.SWAGGERSPECDIRNAME
  );
  process.env.SWAGGERSPECDEFTPATH = path.join(
    __dirname,
    "../".repeat(2),
    "spec"
  );
  process.env.SWAGGERCOMPPATH = path.join(
    process.env.SWAGGERSPECPATH,
    COMPONENTS
  );
  process.env.SWAGGERFUNCPATH = path.join(
    process.env.SWAGGERSPECPATH,
    FUNCTIONS
  );
  process.env.SWAGGERSCHEMAPATH = path.join(
    process.env.SWAGGERCOMPPATH,
    SCHEMAS
  );
  process.env.SWAGGERPARAMPATH = path.join(
    process.env.SWAGGERCOMPPATH,
    PARAMETERS
  );
  process.env.SWAGGERREQPATH = path.join(
    process.env.SWAGGERCOMPPATH,
    REQUESTBODIES
  );
  process.env.SWAGGERRESPPATH = path.join(
    process.env.SWAGGERCOMPPATH,
    RESPONSES
  );
}

module.exports = { eject };
