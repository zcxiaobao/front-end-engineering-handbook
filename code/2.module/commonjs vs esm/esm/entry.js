import { count, add, obj, alterObj } from "./moduleA.js";
console.log("count: ", count, " obj.count:", obj.count); // count:  0  obj.count: 0
add();
console.log("count: ", count, " obj.count:", obj.count); // count:  1  obj.count: 1

console.log("obj", obj); // obj { count: 1 }
alterObj();
console.log("obj", obj); // obj { newCount: 0 }
