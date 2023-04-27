console.log('a.js 开始执行');
exports.done = false;
let {done: bDone} = require('./b.js');
console.log('in a，b.done =', bDone);
exports.done = true;
console.log('a.js 执行完毕');