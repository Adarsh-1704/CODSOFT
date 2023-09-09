const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const jwtSecret = "MynameisAdarshaIlovecarsandbikes#"

router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 3 }),
    // password must be at least 5 chars long
    body("password", "Password too short").isLength({ min: 5 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() })
  }

    const salt = await bcrypt.genSalt(10);
    let secPass = await bcrypt.hash(req.body.password, salt)

    try {
      await User.create({
        name: req.body.name,
        // password: req.body.password,  first write this and then use bcryptjs
        password: secPass,
        email: req.body.email,
        location: req.body.location
    }).then(user => {
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, jwtSecret);
        success = true
        res.json({ success, authToken })
    })
        .catch(err => {
            console.log(err);
            res.json({ error: "Please enter a unique value." })
        })
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post("/loginuser",[
    body("email").isEmail(),
    body("password", "Password too short").isLength({ min: 5 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ errors: "Enter correct email" });
      }

      const passCmp = await bcrypt.compare(req.body.password, userData.password)
      if (!passCmp) {
        return res.status(400).json({ errors: "Enter correct password" });
      }

      const data = {
        user:{
            id: userData.id
        }
      }
      const authToken = jwt.sign(data, jwtSecret)

      return res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
