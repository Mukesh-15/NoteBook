const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs"); //for hashing
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "something$$$";//salt



//ROUTE: SIGNIN
router.post(
  "/signin",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a password of minimum length").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({success:false, errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email }); //check if mail is already used

      if (user) {
        //if user exits with the given mail
        return res
          .status(400)
          .json({success:false, error: "User with this email already exists" });
      }
      const salt = await bcrypt.genSaltSync(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //else create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);

      res.json({success:true, authToken: authToken });
    } catch (error) {
      console.error(error.message);
      
      res.status(500).send("some error occured");
    }
  }
);


//ROUTE 2 : LOGIN
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password cannot be").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ success:false,error: errors.array()[0].msg });
    }

    const {email,password} = req.body;

    try {
      let user = await User.findOne({email}); //check a user exits with a given mail and get the user

      if (!user) {
        //if user dosenot exits with the given mail
        return res
          .status(400)
          .json({ success:false,error: "wrong password or email id" });
      }

      const comparePass = await bcrypt.compare(password,user.password);
      if(!comparePass){
        return res
          .status(400)
          .json({ success:false,error: "wrong password or email id" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(payload, JWT_SECRET);

      res.json({ success:true,authToken: authToken });

    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  }
);

//ROUTE: get user 
router.post('/getuser',fetchuser,async (req,res)=>{
  
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    res.send(user);
  } catch (error) {
    
  }
});

module.exports = router;
