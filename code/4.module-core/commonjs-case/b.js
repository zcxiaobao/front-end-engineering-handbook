console.log('b.js 开始执行');
exports.done = false;
let {done: aDone} = require('./a.js');
console.log('in b，a.done =', aDone);
exports.done = true;
console.log('b.js 执行完毕');