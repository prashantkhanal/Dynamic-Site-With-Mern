const User = require('../model/user');

exports.userAuth = async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({
      message: 'please fill the form corrwectly',
    });
  }
  try {
    const userExits = await User.findOne({ email });
    if (userExits) {
      return res.status(200).json({ message: 'user already exits' });
    }
    const user = new User({ name, email, phone, password, cpassword });

    await user.save();
    res.status(201).json({ message: 'user created sucessfully' });
  } catch (err) {
    console.log(err);
  }
};
