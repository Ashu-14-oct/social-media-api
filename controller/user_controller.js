const User = require("../models/user");

//sign up endpoint
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

//sign in endpoint
module.exports.signIn = function(req, res){
    return res.status(200).json({success: true, message: 'signed in successfully!'});
}

//sing out endpoint
module.exports.signOut = function(req, res){
    req.logout(function(err) {
        if (err) { console.log(err);}
        res.status(200).json({message: 'signed out successfully'});
      });
}

//follow user endpoint
module.exports.followUser = async function(req, res){
  try{
    const currentUser = await User.findById(req.user._id);
    const userToFollow = await User.findById(req.params.id);
    
    if(!userToFollow){
      return res.status(404).json({message: 'user not found'});
    }

    //check if user is already following
    if(currentUser.following.includes(userToFollow._id)){
      return res.status(400).json({message: `You are already following ${userToFollow.name}`});
    }

    await currentUser.following.push(userToFollow._id);
    await userToFollow.followers.push(currentUser._id);

    await currentUser.followingCount++;
    await userToFollow.followersCount++;

    await currentUser.save();
    await userToFollow.save();

    return res.status(200).json({message: `You are now following ${userToFollow.name}`});

  }catch(err){
    console.log(err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

//unfollow user endpoint
module.exports.unfollowUser = async function(req, res){
  try{
    const currentUser =  await User.findById(req.user._id);
    const userToUnfollow = await User.findById(req.params.id);

    if(!userToUnfollow){
      return res.status(404).json({message: 'User not found'});
    }

    //if user is already not following the other user
    if(!currentUser.following.includes(userToUnfollow._id)){
      return res.status(400).json({message: "You are not following this user"});
    }

    currentUser.following = currentUser.following.filter(id => id.toString() !== userToUnfollow._id.toString());
    userToUnfollow.followers = userToUnfollow.followers.filter(id => id.toString() !== currentUser._id.toString());

    await currentUser.followingCount--;
    await userToUnfollow.followersCount--;

    await currentUser.save();
    await userToUnfollow.save();

    return res.status(200).json({message: `you have unfollowed ${userToUnfollow.name}`});

  }catch(err){
    console.log(err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}