const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");
//route 1 :create user means to store the user emailid and password and userid thats it

router.post('/createuser',
  [
    body('email', 'Enter valid email').isEmail(),
    body('name', 'Enter valid name atleast 3 characters').isLength({ min: 3 }),
    body('password', 'Enter valid password atleast 5 characters').isLength({ min: 5 }),
  ],
  async (req, res) => {
  let success=false;

    //validation name and password contain atleast values and unique email id
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success,errors: errors.array() });
    }


    //for security so adding salt and hash to store the password
    const salt = await bcrypt.genSalt(10);
    const secpass = await bcrypt.hash(req.body.password, salt);
    //trying that condition than if it not exit not cath the error next
    try {
      let user = await User.findOne({ email: req.body.email });
      //checking the email exit if exit than show the error
      if (user) {
        return res.status(400).json({success, error: "Sorry this email already exists" })
      }

      //creating the user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass
      });

      const JWT_Secreat_Key = 'amarjante';
      //json authentication 
      const data = {
        user: {
          id: user.id
        }
      }
      const token = jwt.sign(data, JWT_Secreat_Key);
      success=true;
      res.json({success,authToken:token});


    }
    //catch the error other than the unique email id 
    catch (error) {
      res.status(500).send("internal servar error");
    }
  });


// route 2:login page to verify the user emailid and password 


router.post('/login',
  [
    body('email', 'sorry please enter correct credentials').isEmail(),
    body('password', 'Password cannot be blanks').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({success:false, error: "sorry please enter correct credentials" })
      }
      const compareTopassword = await bcrypt.compare(password, user.password);
      if (!compareTopassword) {
        return res.status(400).json({success:false, error: "sorry please enter correct credentials" })
      }
      const data = {
        user: {
          id: user.id
        }
      }
      const token = jwt.sign(data, 'amarjante');
      res.json({success:true,authToken:token});
    }
    catch (error) {
      res.status(500).send("internal servar error");
    }
  });

//route 3:getuser
router.post('/getuser', fetchuser,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    }
    catch (error) {
      res.status(500).send("Internal servar error");
    }

  });


module.exports = router;