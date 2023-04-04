// const { onlyESM } = require("./esm-only.mjs");
// console.log(onlyESM);

(async () => {
  const { onlyESM } = await import("./esm-only.mjs");
  console.log(onlyESM);
})();
