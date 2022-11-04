const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String, 
    required: true, 
    unique: true
  }, 
  password: {
    type: String, 
    required: true
  }
})

// we could handle hashing and user validation within the signup controller 
// or, we could handle them with a custom-made "static method" on the user model

// static signup method
// can't use an arrow function here, because it erases the context for "this"
userSchema.statics.signup = async function (username, password) {

  // validation
  if (!username || !password){
    throw Error('Please include all fields')
  }

  if (!validator.isStrongPassword(password)){
    throw Error('Please use a stronger password')
  }

  // check if username/account already exists
  const exists = await this.findOne({ username })
  
  if (exists){
    throw Error('this username is already being used')
  }

  // hashing 
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  // create user
  const user = await this.create({ username: username, password: hash})

  return user
}

// static login method 
userSchema.statics.login = async function (username, password) {
  if (!username || !password){
    throw Error('Please include all fields')
  }

  const user = await this.findOne({ username })
  
  if (!user){
    throw Error('Incorrect username')
  }

  // user.password is the hashed one in the db
  const match = await bcrypt.compare(password, user.password)

  if (!match){
    throw Error('Incorrect password')
  }
  
  return user
}

module.exports = mongoose.model('User', userSchema)
