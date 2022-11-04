const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()

// jwt token 
const createToken = (_id) => {
  // payload, secret, options; returns the token
  return jwt.sign({_id}, process.env.SECRET, {expiresIn: '5d'})
}

// login 
const loginUser = async (req, res) => {
  res.json({mssg: 'login user'})
}


// signup 
const signupUser = async (req, res) => {

  const username = req.body.username
  const password = req.body.password

  try {
    const user = await User.signup(username, password)
    // this token will be a string with 3 parts: header, payload, and secret
    const token = createToken(user._id)
    res.status(200).json({ username, token })
  } catch (error){
    res.status(400).json({error: error.message})
  }
}

module.exports = { signupUser, loginUser}