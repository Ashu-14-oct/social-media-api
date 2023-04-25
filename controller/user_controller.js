const User = require("../models/user");

module.exports.signUp = async function (req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      console.log("User is already made using this email");
      return;
    }

    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    console.log(newUser);
    return res
      .status(200)
      .json({ success: true, message: "User created successfullly" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({success: false, message: 'Internal server error'});
  }
};

module.exports.signIn = function(req, res){
    return res.status(200).json({success: true, message: 'signed in successfully!'});
}

module.exports.signOut = function(req, res){
    req.logout(function(err) {
        if (err) { console.log(err);}
        res.status(200).json({message: 'signed out successfully'});
      });
}