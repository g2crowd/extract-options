export default function (data, namespace) {
  const regex = new RegExp(namespace + '_?([\\w])([\\w]+)', 'i');
  const format = (_, first, rest) => first.toLowerCase() + rest;

  return Object.keys(data).reduce((memo, key) => {
    let value = data[key];
    const prop = key.replace(regex, format);
    if (value === '') {
      value = undefined;
    }
    memo[prop] = value;
    return memo;
  }, {});
}
