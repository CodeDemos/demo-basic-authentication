'use strict';
/**
 * Step 2
 * - Create User with plain-text UN/PW and store in DB
 * - Update Basic Strategy to finduser and compare
 */

var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var app = express();

// ===== Define UserSchema & UserModel =====
var UserSchema = new mongoose.Schema({
  firstName: {type: String, default: ""},
  lastName: {type: String, default: ""},
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    username: this.username,
    firstName: this.firstName,
    lastName: this.lastName
  };
}

UserSchema.methods.validatePassword = function(password) {  
    return password === this.password;
};

var UserModel = mongoose.model('User', UserSchema);

// ===== Define and create basicStrategy =====
var basicStrategy = new BasicStrategy(function(username, password, done) {
  let user;
  UserModel
    .findOne({ username })
    .then(results => {
      user = results;    
      
      if (!user) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect username',
          location: 'username'
        });
      }
    
      const isValid = user.validatePassword(password);
      if (!isValid) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect password',
          location: 'password'
        });
      }
      return done(null, user);    
    }).catch(err => {
      if (err.reason === 'LoginError') {
        return done(null, false);
      }

      return done(err);
    });
});

passport.use(basicStrategy);
const authenticate = passport.authenticate('basic', {session: false});

// ===== Protected endpoint =====
app.get('/api/protected', authenticate, function (req, res) {
  res.json( req.user );
}); 

// ===== Public endpoint =====
app.get('/api/public', function (req, res) {
  res.send( 'Hello World!' );
}); 

// ===== Post '/users' endpoint to save a new User =====
// saves a user with plain-text password to the DB
app.post('/api/users', jsonParser, function(req, res) {
  // NOTE: validation removed for brevity
  let {username, password, firstName, lastName} = req.body;

  return UserModel
    .find({username})
    .count()
    .then(count => {
      if (count > 0) {
        return Promise.reject({
          code: 422,
          reason: 'ValidationError',
          message: 'Username already taken',
          location: 'username'
        });
      }
      return UserModel.create({username, password, firstName, lastName});    
    })
    .then(user => {
      return res.status(201).json(user.apiRepr());
    })
    .catch(err => {
      if (err.reason === 'ValidationError') {
        return res.status(err.code).json(err);
      }
      res.status(500).json({code: 500, message: 'Internal server error'});
    });
});

mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    app.listen(process.env.PORT || 8080, () => {
      console.log(`app listening on port ${process.env.PORT || 8080}`)
    });
  }); 