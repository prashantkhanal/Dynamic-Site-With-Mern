const bcrypt = require('bcryptjs');
const User = require('../model/user');
const jwt = require('jsonwebtoken');

exports.userSignup = async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(400).json({ message: 'please fill the form correctly' });
  }

  try {
    const userCheck = await User.findOne({ email: email });
    if (userCheck) {
      return res.status(400).json({ message: 'email is already in use' });
    } else if (password != cpassword) {
      return res.status(400).json({ message: 'password doesnot match' });
    }
    const user = await new User({
      name,
      email,
      phone,
      work,
      password,
      cpassword,
    });
    await user.save();
    res.status(201).json({ message: req.body });
  } catch (err) {
    console.log(err);
  }
};

exports.userSignin = async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'please fill the form correctly' });
    }
    const userExits = await User.findOne({ email: email });

    if (userExits) {
      const isMatch = await bcrypt.compare(password, userExits.password);
      token = await userExits.generateAuthToken();
      console.log(token);

      if (isMatch) {
        return res.status(200).json({ message: 'Login is sucessful' });
      } else {
        return res.status(400).json({ message: 'invlaid user crendetals' });
      }
    } else {
      return res.status(400).json({ message: 'invliad crendetails' });
    }
  } catch (err) {
    console.log(err);
  }
};
