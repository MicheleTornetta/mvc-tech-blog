const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../../models/user');

// GET one user
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id);
    if (!userData) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json({
      username: userData.username,
      email: userData.email,
      id: userData.id
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a new user
// POST /api/users/
//created password length
router.post('/', async (req, res) => {
  try {
    const newUser = req.body;
    if (newUser.password?.length < 8) {
      res.status(400).json({err: "Password must be at least 8 characters."});
      return;
    }
    // create the newUser with the hashed password and save to DB
    const userData = await User.create(newUser);

    req.session.user = userData.id;

    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// LOGIN user
// POST /api/users/login
router.post('/login', async (req, res) => {
  try {
    const user = req.body;
    if (!user.username) {
      res.status(400).json({
        'err': "Missing username"
      });
      return;
    }

    if (!user.password) {
      res.status(400).json({
        'err': "Missing password"
      });
      return;
    }
    
    const userData = await User.findOne({
      username: user.username,
    });

    if (userData) {
      if (await bcrypt.compare(user.password, userData.password)) {
        req.session.user = userData.id;

        res.status(200).json({
          username: userData.username,
          email: userData.email,
          id: userData.id
        });
      }
      else {
        res.status(400).json({
          'err': 'Invalid password!',
        });
      }
    }
    else {
      res.status(400).json({
        'err': 'Unable to find user with that username!',
      });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.get('/by-email/:email', async (req, res) => {
//   try {
//     // First, we find a user using their primary key (provided by params)
//     const userData = await User.findByPk(req.params.email);
//     // If userData evaluates as false (no user exists with that primary key), then we will send an error message
//     if (!userData) {
//       res.status(404).json({ message: 'No user with this email!' });
//       return;
//     }
//     // If a user does exist at the primary key, we get to use the instance method that we wrote in User.js to see if the user has pets
//     const emailData = userData.email();
//     // If emailData evaluates as false (user has no email), then the user will receive the message below
//     if (!emailData) {
//       res.status(400).json({ message: 'This person has no email on file.' });
//       return;
//     }
//     // Otherwise, the user will see that the user that they searched does have pets!
//     res.json({ message: 'Your email has no password associated with it!' });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// PUT update a user
router.put('/:id', async (req, res) => {
  try {
    const userData = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!userData[0]) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/:username', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id);
    if (!userData) {
      res.status(404).json({ message: 'No Username not on file!' });
      return;
    }
    res.status(200).json(userData.isUserNameOnFile());
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
