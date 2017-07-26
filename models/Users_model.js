const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema({

  local: {
    // name: {
    //   type: String,
    //   required: true
    // },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  },
  facebook: {
    id: {
      type: String
    },
    token: {
      type: String
    },
    email: {
      type: String
    },
    name: {
      type: String
    }
  }
})

// generating a hash ================================

userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

// check if password is valid =======================

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password)
}

const User = mongoose.model('User', userSchema)

module.exports = User
