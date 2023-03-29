require.config({
  baseUrl: "scripts/utils",
});

require(["print"], function (printModule) {
  printModule.print("entry");
});
