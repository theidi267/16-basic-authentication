'use strict';

import express from 'express';
import Petrobot from '../models/petrobots.js';
const authRouter = express.Router();

import User from './model.js';
import auth from '../auth/middleware.js';

authRouter.post('/signup', (req,res,next) => {
  let user = new User (req.body);
  user.save()
    .then(user => res.send(user.generateToken()))
    .catch(next);
});

authRouter.get('/signin', auth, (req,res,next) => { //eslint-disable-line 
  console.log(req.user); 
  res.send(req.user.generateToken());  
});

authRouter.post('/api/petrobots', auth, (req,res,next) => { //eslint-disable-line
  let pet = new Petrobot (req.body);
  console.log(pet);
  pet.save()
    .then(data => sendJSON(res,data))
    .catch(next);  
});

let sendJSON = (res,data) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(data));
  res.end();
};

export default authRouter;