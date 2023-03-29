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

module.exports = { count, add, obj, alterObj };
