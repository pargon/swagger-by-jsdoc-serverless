const { updatePackJson } = require("../src/common");

async function eject() {
  await updatePackJson();
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
