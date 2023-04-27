console.log('a starting');
export var done = false;
import { done as bDone } from './b.js';
console.log('in a, b.done =', bDone);
done = true;
console.log('a done');