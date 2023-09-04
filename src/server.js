/* eslint-disable global-require */
const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const docDescription = require("./plugin/lib/docDescription");

let docsJson = {};
try {
  docsJson = require("./plugin/lib/specs");
} catch (error) {
  throw new Error(error);
}

const app = express();
const PORT = process.env.PORT || 4000;

docsJson.info.description = docDescription.document;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(docsJson));

async function initialize() {
  app.listen(PORT);
}

initialize().finally(() => {
  console.info(`app started: http://localhost:${PORT}/api-docs`);
});
