const config = require("../src/config");
const { copyDefaultSpec } = require("../src/common");

async function eject() {
  config.eject();
  await copyDefaultSpec(
    process.env.SWAGGERSPECDEFTPATH,
    process.env.SWAGGERSPECPATH
  );
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
