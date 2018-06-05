'use strict';

export default (err,req,res,next) => { //eslint-disable-line
  let error = {error:err};
  res.statusCode = 500;
  res.statusMessage = 'Server error';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(error));
  res.end();
};