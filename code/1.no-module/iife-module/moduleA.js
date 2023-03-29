let moduleA = (function (module) {
  const _moduleName = "moduleA";
  const getModuleName = function () {
    module.getModuleData();
    return _moduleName;
  };
  return { getModuleName };
})(moduleC);
