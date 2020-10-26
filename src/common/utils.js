const utils = {};

utils.getFormatedData = x => {
  if (typeof x === 'object' && x !== null) {
    if (!Object.keys(x).length) return null;
    return JSON.stringify(x);
  }
  return x.toString();
};

module.exports = utils;
