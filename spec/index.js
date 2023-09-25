const basicInfo = require("./basicInfo");
const servers = require("./servers");
const components = require("./components");
const security = require("./security");
const login = require("./login");
const functions = require("./functions");

module.exports = {
  ...basicInfo,
  ...servers,
  components: {
    ...components,
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      },
      basicAuth: {
        type: "http",
        scheme: "basic"
      }
    }
  },
  ...security,
  tags: [],
  paths: {
    ...login,
    ...functions
  }
};
