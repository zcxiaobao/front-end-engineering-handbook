console.log(moduleA.getModuleName());
console.log(moduleB.getModuleName());

moduleA._moduleName = "alterModule";
console.log(moduleA.getModuleName());
