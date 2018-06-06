![CF](https://camo.githubusercontent.com/70edab54bba80edb7493cad3135e9606781cbb6b/687474703a2f2f692e696d6775722e636f6d2f377635415363382e706e67) 16: Basic Auth
===

[![Build Status](https://travis-ci.com/theidi267/16-basic-authentication.svg?branch=master)](https://travis-ci.com/theidi267/16-basic-authentication)

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
});
```

This api supports a mongoose 'petrobot' model that is represented by the following:
```name: { type:String, required:true },
  species: { type:String, uppercase:true, required:true},
  legs: { type:Number, default:'4'},
  skills: { type:String, uppercase:true, default:'PURR'},
  userid: {type:mongoose.Schema.Types.ObjectId, ref:'users'},
});
```
*The User Model also has `authenticate()`, `comparePassword()` and `generateToken()` methods*

## Server Endpoints

**POST** `/api/signup`

### https://basic-authentication-16.herokuapp.com/api/signup
* `POST` request - when a user signs up with username, email and password, it sends back a token for Beareer authorization

- Example
 
 ```
 {"username": "justin", "email": "goat@sheep.com", "password": "foo"}
 ```

- Example for token

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMTg0ZDhmOGRkOWYwZDhlOTk2MmVjMSIsImlhdCI6MTUyODMxOTM3NX0.Pzg_k06Z7wGMi83g4QCM4Nr4AAYy8pinQqlfwj-mFEg
```


**GET** `api/signin`

### https://basic-authentication-16.herokuapp.com/api/signin

* `GET` request, if hit with Bearer token, user is signed in, otherwise throws error 'bummer'


- Example for error
```
{
    "error": "bummer"
}
```

**GET** `api/v1/petrobots`

### https://basic-authentication-16.herokuapp.com/api/v1/petrobots

- If hit with bearer token, will return a list of all pet-robots

- Example 

```
[
{
    "legs": 5,
    "skills": "WELDING",
    "_id": "5b18514d62f85dd94bcc91f9",
    "name": "purritron",
    "species": "MECH-CAT",
    "userid": "5b184d8f8dd9f0d8e9962ec1",
    "__v": 0
  },
  {
    "legs": 3,
    "skills": "KNIFE FIGHTING",
    "_id": "5b1851d362f85dd94bcc91fa",
    "name": "W00FPO",
    "species": "DOG-MATIC",
    "userid": "5b184d8f8dd9f0d8e9962ec1",
    "__v": 0
  }
]
```

**GET** `api/v1/petrobots/:id`

### https://basic-authentication-16.herokuapp.com/api/v1/petrobots/:id

- If hit with a Bearer token, returns the specific pet-robot by id and expands the userid attached to the pet-robot

- Example 

```
{
    "legs": 5,
    "skills": "WELDING",
    "_id": "5b18514d62f85dd94bcc91f9",
    "name": "purritron",
    "species": "MECH-CAT",
    "userid": {
        "pets": [
            "5b18514d62f85dd94bcc91f9",
            "5b1851d362f85dd94bcc91fa"
        ],
        "_id": "5b184d8f8dd9f0d8e9962ec1",
        "username": "justin",
        "email": "goat@sheep.com",
        "password": "$2b$10$gFCcQQPlEMLJg8tfZirp0OFEg23I7sbMFh7V2F7TLTL6m75NolU06",
        "__v": 0
    },
    "__v": 0
}
```

**POST** `api/v1/petrobots`

### https://basic-authentication-16.herokuapp.com/api/v1/petrobots

- If hit with Bearer token, user is able to create a new instance of pet-robot, and send it to the database.

- Input

```
{"name": "W00FPO", "species": "dog-matic", "legs": 3, "skills": "knife fighting", "userid": "5b184d8f8dd9f0d8e9962ec1"}
```

- Output

```
{
    "_id" : ObjectId("5b1851d362f85dd94bcc91fa"),
    "legs" : 3,
    "skills" : "KNIFE FIGHTING",
    "name" : "W00FPO",
    "species" : "DOG-MATIC",
    "userid" : ObjectId("5b184d8f8dd9f0d8e9962ec1"),
    "__v" : 0
}
```

**GET** `api/v1/users`

### https://basic-authentication-16.herokuapp.com/api/v1/users

- If hit with bearer token, will return a list of all users

- Example

```
[
  {
    "pets": [
        "5b18514d62f85dd94bcc91f9",
        "5b1851d362f85dd94bcc91fa"
    ],
    "_id": "5b184d8f8dd9f0d8e9962ec1",
    "username": "justin",
    "email": "goat@sheep.com",
    "password": "$2b$10$gFCcQQPlEMLJg8tfZirp0OFEg23I7sbMFh7V2F7TLTL6m75NolU06",
    "__v": 0
  }
]
```

**GET** `api/v1/user/:id`

### https://basic-authentication-16.herokuapp.com/api/v1/user/5b184d8f8dd9f0d8e9962ec1

- If hit with bearer token, will return the user by id and expand the pet-robots attached to the user

- Example

```
{
  "pets": [
    {
      "legs": 5,
      "skills": "WELDING",
      "_id": "5b18514d62f85dd94bcc91f9",
      "name": "purritron",
      "species": "MECH-CAT",
      "userid": "5b184d8f8dd9f0d8e9962ec1",
      "__v": 0
    },
    {
      "legs": 3,
      "skills": "KNIFE FIGHTING",
      "_id": "5b1851d362f85dd94bcc91fa",
      "name": "W00FPO",
      "species": "DOG-MATIC",
      "userid": "5b184d8f8dd9f0d8e9962ec1",
      "__v": 0
    }
  ],
  "_id": "5b184d8f8dd9f0d8e9962ec1",
  "username": "justin",
  "email": "goat@sheep.com",
  "password": "$2b$10$gFCcQQPlEMLJg8tfZirp0OFEg23I7sbMFh7V2F7TLTL6m75NolU06",
  "__v": 0
}
```





