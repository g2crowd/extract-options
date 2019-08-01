function isString(value) {
  return Object.prototype.toString.call(value) === '[object String]';
}

function isJsonish(value) {
  return isString(value) && (value[0] === '{' || value[0] === '[');
}

function tryJSON(value) {
  let result = value;

  try {
    result = JSON.parse(value);
  } catch (e) {
    if (!(e instanceof SyntaxError)) {
      throw e;
    }
  }

  return result;
}

function normalizeDataset(dataset) {
  let obj = Object.assign({}, dataset);

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (isJsonish(obj[key])) {
        obj[key] = tryJSON(obj[key]);
      }
    }
  }

  return obj;
}

export { normalizeDataset };
