let count = 0;
let obj = {
  count: 0,
};
let add = () => {
  count++;
  obj.count++;
};
let alterObj = () => {
  obj = {
    newCount: 0,
  };
};

export { count, add, obj, alterObj };
