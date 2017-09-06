'use strict';
/**
 * Step 1
 * Protect endpoint with Passport basic strategy using a **hardcoded** UN/PW
 */
 
const express = require('express');

const passport = require('passport');
const {BasicStrategy} = require('passport-http');

const app = express();

// ===== Define and create basicStrategy =====
const basicStrategy = new BasicStrategy(function (username, password, done) {
    try {
      if (username != 'bobuser') {
        console.log('Incorrect username');
        return done(null, false);
      }
      
      if (password != 'baseball') {
        console.log('Incorrect password');
        return done(null, false);
      }
      
      const user = {username, password};
      done(null, user);
    }
    catch(err){
      done(err);
    }
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

app.listen(process.env.PORT || 8080, () => {
  console.log(`app listening on port ${process.env.PORT || 8080}`)
});
