function makeRequireFunction(mod, redirects) {
  const Module = mod.constructor;
  let require;
  if (redirects) {
    // ...
  } else {
    require = function require(path) {
      return mod.require(path);
    };
  }
  // 路径分析
  function resolve(request, options) {
    validateString(request, 'request');
    return Module._resolveFilename(request, mod, false, options);
  }
  require.resolve = resolve;
  // node_modules 寻址路径
  function paths(request) {
    validateString(request, 'request');
    return Module._resolveLookupPaths(request, mod);
  }
  resolve.paths = paths;
  // 主入口模块信息
  setOwnProperty(require, 'main', process.mainModule);
  // 各类文件模块的处理程序
  require.extensions = Module._extensions;
  // 模块缓存
  require.cache = Module._cache;
  return require;
}



Module.prototype.require = function(id) {
    // 检查模块id
    validateString(id, 'id');
    if (id === '') {
      throw new ERR_INVALID_ARG_VALUE('id', id,
                                      'must be a non-empty string');
    }
    requireDepth++;
    try {
      // 正式进入模块分析
      return Module._load(id, this, /* isMain */ false);
    } finally {
      requireDepth--;
    }
  };


Module._load = function(request, parent, isMain) {
    let relResolveCacheIdentifier;
    // node 高版本新提出，可以通过 node:: 前缀加载用户侧可加载的内置模块
    if (StringPrototypeStartsWith(request, 'node:')) {
      // Slice 'node:' prefix
      const id = StringPrototypeSlice(request, 5);
  
      const module = loadBuiltinModule(id, request);
      if (!module?.canBeRequiredByUsers) {
        throw new ERR_UNKNOWN_BUILTIN_MODULE(request);
      }
  
      return module.exports;
    }
    // 获取文件的绝对路径，作为缓存键
    const filename = Module._resolveFilename(request, parent, isMain);
    // 获取缓存
    const cachedModule = Module._cache[filename];
    // 存在缓存，直接返回缓存中对象的 exports 
    if (cachedModule !== undefined) {
      updateChildren(parent, cachedModule, true);
      // 如果要加载的模块缓存已经存在，但是并没有完全加载好（循环依赖关键）
      if (!cachedModule.loaded) {
        const parseCachedModule = cjsParseCache.get(cachedModule);
        if (!parseCachedModule || parseCachedModule.loaded)
          return getExportsForCircularRequire(cachedModule);
        parseCachedModule.loaded = true;
      } else {
        return cachedModule.exports;
      }
    }
    // 检测是否为内置模块
    const mod = loadBuiltinModule(filename, request);
    if (mod?.canBeRequiredByUsers &&
        BuiltinModule.canBeRequiredWithoutScheme(filename)) {
      return mod.exports;
    }
  
    // 缓存中不存在，也非内置模块，创建一个新的 module 实例
    const module = cachedModule || new Module(filename, parent);
  
    if (isMain) {
      process.mainModule = module;
      setOwnProperty(module.require, 'main', process.mainModule);
      module.id = '.';
    }
  
    reportModuleToWatchMode(filename);
    // 将新模块实例进行缓存，文件绝对路径为key
    Module._cache[filename] = module;
    if (parent !== undefined) {
      relativeResolveCache[relResolveCacheIdentifier] = filename;
    }
    // 
    let threw = true;
    try {
      // 加载文件内容
      module.load(filename);
      threw = false;
    } finally {
      // 如果加载失败，删除缓存
      if (threw) {
        delete Module._cache[filename];
        if (parent !== undefined) {
          delete relativeResolveCache[relResolveCacheIdentifier];
          const children = parent?.children;
          if (ArrayIsArray(children)) {
            const index = ArrayPrototypeIndexOf(children, module);
            if (index !== -1) {
              ArrayPrototypeSplice(children, index, 1);
            }
          }
        }
      } else if (module.exports &&
                 !isProxy(module.exports) &&
                 ObjectGetPrototypeOf(module.exports) ===
                   CircularRequirePrototypeWarningProxy) {
        ObjectSetPrototypeOf(module.exports, ObjectPrototype);
      }
    }
    // 返回 module.exports 对象
    return module.exports;
};
  