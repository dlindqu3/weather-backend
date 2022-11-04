const mongoose = require('mongoose')

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

// we could handle hashing within the signup controller 
// or, we could handle hashing with a custom-made "static method" on the user model

// static signup method
userSchema.statics.signup = async (email, password) => {

  const exists = await this.findOne({ email })
  
  if (exists){
    throw Error('this email is already being used')
  }
}

module.exports = mongoose.model('User', userSchema)
