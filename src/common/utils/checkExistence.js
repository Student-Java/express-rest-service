const { NotFound } = require('http-errors');

const checkExistence = async (get, entityName, ...restProps) => {
  const res = await get(...restProps);
  if (!res) {
    throw new NotFound(`${entityName} not found`);
  }
  return res;
};

module.exports = { checkExistence };
