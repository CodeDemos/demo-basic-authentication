'use strict';
/**
 * Bcrypt Demo
 * - Use Bcrypt to hash password
 * - Use Bcrypt to validate passwords
 */

var bcrypt = require('bcryptjs');

/** Bcrypt using promises */
bcrypt.hash('baseball', 10)
  .then(digest => {
    console.log('digest:', digest);
    return digest;
  })
  .then(digest => {
    return bcrypt.compare('baseball', digest)
  })
  .then(valid => {
    console.log(valid);
  })
  .catch(err => {
    console.error('error', err);
  });