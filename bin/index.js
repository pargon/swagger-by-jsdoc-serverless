/* eslint-disable class-methods-use-this, no-console, max-len */
const spec = require("../lib/specJson");
const dHtml = require("../lib/jsonHtml");

process.env.DIRNAME = "src";
process.env.SERVERLESSPATH = "serverless.yml";
process.env.FILEWRITETMP = "tmp";
process.env.SPECDIRNAME = "swagger";
process.env.SPECDEFAULT = "../spec";

class MyPlugin {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;
    this.commands = {
      buildSpecJson: { lifecycleEvents: ["spec"] },
      buildSpecHtml: { lifecycleEvents: ["html"] }
    };
    this.hooks = {
      "buildSpecJson:spec": this.buildSpecJson.bind(this),
      "buildSpecHtml:html": this.buildSpecHtml.bind(this)
    };
  }

  initializeOnce() {
    spec.eject();
  }

  async beforeDeploy() {
    console.log("Antes de desplegar...");
    // await spec.eject();
    // console.log("durante de desplegar...");
    // dHtml.eject();
    console.log("fin función beforeDeploy");
  }

  async afterDeploy() {
    console.log("Después de desplegar...");
  }

  async buildSpecJson() {
    this.serverless.cli.log("Rebuild Spec:");
    await spec.eject();
  }

  async buildSpecHtml() {
    this.serverless.cli.log("Rebuild Html:");
    await dHtml.eject();
  }
}

module.exports = MyPlugin;

// class ServerlessPlugin {
//   constructor(serverless, options) {
//     this.serverless = serverless;
//     this.options = options;

//     this.commands = {
//       welcome: {
//         usage: "Helps you start your first Serverless plugin",
//         lifecycleEvents: ["hello", "world"],
//         options: {
//           message: {
//             usage:
//               "Specify the message you want to deploy " +
//               "(e.g. /"--message 'My Message'/" or /"-m 'My Message'/")",
//             required: true,
//             shortcut: "m"
//           }
//         }
//       }
//     };

//     this.hooks = {
//       "before:welcome:hello": this.beforeWelcome.bind(this),
//       "welcome:hello": this.buildSpecJson.bind(this),
//       "welcome:world": this.displayHelloMessage.bind(this),
//       "after:welcome:world": this.afterHelloWorld.bind(this)
//     };
//   }

//   beforeWelcome() {
//     this.serverless.cli.log("Hello from Serverless!");
//   }

//   buildSpecJson() {
//     this.serverless.cli.log("Your message:");
//   }

//   displayHelloMessage() {
//     this.serverless.cli.log(`${this.options.message}`);
//   }

//   afterHelloWorld() {
//     this.serverless.cli.log("Please come again!");
//   }
// }

// module.exports = ServerlessPlugin;
