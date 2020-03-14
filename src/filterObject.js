export default (obj, fn) =>
  Object.keys(obj).reduce((memo, key) => {
    const val = obj[key];
    if (fn(val, key)) {
      memo[key] = val;
    }
    return memo;
  }, {});
