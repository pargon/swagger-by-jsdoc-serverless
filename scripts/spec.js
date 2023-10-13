const config = require("../src/config");
const spec = require("../src/functions/specJson");

async function eject() {
  try {
    config.eject();
    await spec.eject();
  } catch (error) {
    console.log(error);
  }
}

eject()
  .then(() => {
    process.exit();
  })
  .catch((error) => {
    process.exit(1);
  });
