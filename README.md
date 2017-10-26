Basic Authentication
================================

Step 1: Note: the passport basic strategy is really only responsible for telling the browser to prompt the user a UN/PW and then receiving them. It is your responsibility as a developer to 'fill-in' the details on how to compare the passwords. For step 1, we just compare hardcoded plain-text passwords. 
  - Instantiate a strategy and implement a basic password comparison
  - Protect endpoint with Passport basic strategy using a hardcoded UN/PW

Step 2: Add Mongoose (and mongo) into the mix so we can store and retrieve passwords for multiple users.
  - Create User with plain-text UN/PW and store in DB
  - Update Basic Strategy to find the user and compare password

Step 3: Finally, add Bcrypt to the mix so we can hash the passwords before storing them and use bcrypt.compare to validate authentication.
  - Add Bcrypt to hash password before saving
  - Add Bcrypt to validate passwords when comparing
 
Bonus file
- bcrypt.js is a standalone demo of .hash() and .compare()
