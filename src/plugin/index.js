/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
const spec = require("./lib/rebuildSpec");
const dHtml = require("./lib/rebuildHtml");

class MyPlugin {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;
    this.hooks = {      "before:deploy:deploy": this.beforeDeploy.bind(this), "after:deploy:deploy": this.afterDeploy.bind(this)    };
  }

  async beforeDeploy() {
    console.log("Antes de desplegar...");    
    await spec.eject();
    console.log("durante de desplegar...");
    dHtml.eject();
    console.log("fin función beforeDeploy");
  }

  async afterDeploy() {
    console.log("Después de desplegar...");
    // Tu lógica personalizada después de desplegar
  }
}

module.exports = MyPlugin;
