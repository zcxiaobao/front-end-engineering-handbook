let moduleB = (function () {
  const _moduleName = "moduleB";
  const getModuleName = function () {
    return _moduleName;
  };
  return { getModuleName };
})();
