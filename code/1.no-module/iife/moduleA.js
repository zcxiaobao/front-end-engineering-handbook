let moduleA = (function () {
  const _moduleName = "moduleA";
  const getModuleName = function () {
    return _moduleName;
  };
  return { getModuleName };
})();
