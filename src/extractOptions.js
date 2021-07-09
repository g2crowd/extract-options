import filterObject from './filterObject';
import stripNamespace from './stripNamespace';

const extractOptions = function (data, namespace) {
  const optionKey = namespace ? namespace + 'Options' : 'options';
  const options = data[optionKey];
  const regex = new RegExp(`^${namespace || ''}.+`);

  data = filterObject(data, function (val, key) {
    if (key !== optionKey) {
      return regex.test(key);
    }
  });

  return Object.assign(stripNamespace(data, namespace), options);
};

export default extractOptions;
