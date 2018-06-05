![CF](https://camo.githubusercontent.com/70edab54bba80edb7493cad3135e9606781cbb6b/687474703a2f2f692e696d6775722e636f6d2f377635415363382e706e67) 16: Basic Auth
===

[![Build Status](https://travis-ci.com/theidi267/16-basic-authentication.svg?branch=master)](https://travis-ci.com/theidi267/16-basic-authentication.svg?branch=master)

* **Git Hub Repo:** [https://github.com/theidi267/16-basic-authentication](https://github.com/theidi267/16-basic-authentication)
* **Heroku App:** [https://basic-authentication-16.herokuapp.com/](https://basic-authentication-16.herokuapp.com/)
* **Travis Build:** [hhttps://travis-ci.com/theidi267/16-basic-authentication](https://travis-ci.com/theidi267/16-basic-authentication)

# Overview
This is an app created to simulate authentication and verification for a user. This app is created by Node.js using Express. This app also uses Bcrypt to hash the users password, and JSON Web Token to send an Authentication token to the user.

# Configuration

Make sure that your MONGODB_URI config var is set in Heroku.

Necessary dependencies are downloaded. (*located in package.json*)

## Data Models

This api supports a mongoose 'user' model that is represented by the following:
```const userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
});```
*The User Model also has `authenticate()`, `comparePassword()` and `generateToken()` methods*

## Server Endpoints

**POST** `/api/signup`

### `/api/signup`
* `POST` request
* the client should pass the username and password in the body of the request
* the server should respond with a token (generated using `jwt`)
* the server should respond with **400 Bad Request** to a failed request

**GET** `api/signin`

### `/api/signin`
* `GET` request
* the client should pass the username and password to the server using a `Basic:` authorization header
* the server should respond with a token for authenticated users
* the server should respond with **401 Unauthorized** for non-authenticated users