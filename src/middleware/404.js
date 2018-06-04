'use strict';

export default (req,res,next) => { //eslint-disable-line
  let error = {error: 'Resource not found'};
  res.statusCode = 404;
  res.statusMessage = 'Not found';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(error));
  res.end();
};