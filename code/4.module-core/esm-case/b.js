console.log('b starting');
export let done = false;
import { done as aDone } from './a.js';
console.log('in b, a.done =', aDone);
done = true;
console.log('b done');