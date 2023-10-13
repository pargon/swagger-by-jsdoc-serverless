const config = require("../src/config");
const dhtml = require("../src/functions/jsonHtml");

async function eject() {
  try {
    config.eject();
    await dhtml.eject();
  } catch (error) {
    console.log(error);
  }
}

eject()
  .then(() => {
    console.log("Complete");
    process.exit();
  })
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });
