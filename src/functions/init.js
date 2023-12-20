const { copyDefaultSpec } = require("../common");

async function eject() {
  await copyDefaultSpec(
    process.env.SWAGGERSPECDEFTPATH,
    process.env.SWAGGERSPECPATH
  );
}
module.exports = { eject };
