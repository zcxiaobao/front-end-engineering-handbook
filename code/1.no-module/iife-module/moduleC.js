let moduleC = (function () {
  const _moduleName = "moduleC";
  const _moduleData = { x: 1 };
  const getModuleData = function () {
    console.log("Module: ", _moduleName, " Data: ", _moduleData.x);
  };
  return { getModuleData };
})();
