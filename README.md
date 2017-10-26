Basic Auth w/ Passport and Bcrypt
=================================

Step 1: Compare hardcoded plain-text passwords. 
  - Instantiate a strategy and implement a basic password comparison
  - Protect endpoint with Passport basic strategy using a hardcoded UN/PW
  - In browser, go to: `http://localhost:8080/api/protected/`
    - Should be promopted for UN/PW by browser
    - Type in bobuser/baseball and submit
    - Should get back "Hello, bobuser"


Step 2: Add Mongo/Mongoose so we can work with multiple users.
  - Create a POST `/api/users` endpoint that stores the plain-text UN/PW
  - Add a user, and verify the user is saved in the DB
  - Update Basic Strategy to find the user and compare password
  - In browser, go to: `http://localhost:8080/api/protected/`
    - Should be promopted for UN/PW by browser
    - Type in bobuser/baseball and submit
    - Should get back "Hello, bobuser" plus details

Step 3: Finally, add Bcrypt to hash the passwords
  - Add `bcrypt.hash` to hash password before persisting to DB
  - Add `bcrypt.compare` to validate passwords when comparing
 
Bonus file
- bcrypt.js is a standalone demo of .hash() and .compare()
