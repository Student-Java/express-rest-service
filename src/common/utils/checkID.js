const { BadRequest } = require('http-errors');

const checkID = id => {
  if (
    !id.match(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    )
  ) {
    throw new BadRequest('ID does not correct');
  }
  return id;
};

module.exports = checkID;
