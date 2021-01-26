const express = require("express");
const router = express.Router();
//const users = require('../../Users');
const User = require("../../models/users.js");
var bcrypt = require('bcryptjs');

//===========================================Get all users
router.get("/", async (req, res) => {
  try {

    const users = await User.find();
    console.log(users);
    
    res.json({
      status:200,
      success:true,
      data:users
    })
  } catch (e) {
    res.json({
      status:404,
      success:false,
      error:e.message
    })
    // res.status(404).json({ success: false, error: err.message });
  }
});
//=========================================== Create Single User
router.post("/add", async (req, res) => {
  //console.log("....",req)
  let { pwd, email, name } = req.body;
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(pwd, salt);
  console.log("hash=====", hash)
  let newUser = { pwd: hash, email, name }
  try {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          User.create(newUser)
           .then(usr=>res.json({
            success: true,
            dbid: user._id,
            status: 201
          }))
        }//if

      })
      .catch(err=>res.json({
        error:err,
        status:404
      }))



  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, error: err.message });
  }

});


  // const newUser = new User(usr);
  // try {
  //   await newUser.save();
  //   res.status(201).json(usr);
  // } catch (e) {
  //   res.status(400).json({ message: "error in saving users" });
  // }


//===================================================================Get single user
router.get('/:id', async (req, res) => {
    try {
    const userOne = await User.findById(req.params.id);
    res.status(200).json({ success: true, data: userOne });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }

    // let id = parseInt(req.params.id)
    // console.log(id)
    // let result = users.filter((item) => item.id == id)
    // res.json(result[0])
});
router.delete('/:id', async (req, res) => {
  try {
       const post = await User.findByIdAndDelete(req.params.id);
  res.json({
      success: true,
      status: 200, //ok
      msg: 'user is deleted successfully'
  })
 
  } catch (error) {
      console.log(error)
  }
  

})
router.post('/login', async (req, res) => {
  let {pwd,email} = req.body;
  console.log(req.body)


  try {
    User.findOne({email})
    .then(user=>{
      console.log(user)
      bcrypt.compare(pwd, user.pwd).then((isMatch) => {
        if (!isMatch) return res.status(400).json({ msg: "Invalid credential" });
        else {
          res.json({
            status: 200,
            data: user,
            msg: "login success"
          })
             }//else
            }) //bcypt then
            // .catch(err => console.log('.....', err))
          })//usr then
      }//try
      catch (error) {
        console.log(error)
      }
    }//post
    )

module.exports = router;
