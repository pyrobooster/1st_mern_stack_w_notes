const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// send post request to user/add and it expect in body
router.route('/add').post((req, res) => {
  // expects in the body the username
  const username = req.body.username;
  // then we create a new user
  const newUser = new User({username});
//  then we save this user
  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;