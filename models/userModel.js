const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  id: ObjectId,
  firstname: {
      type: String,
      required: true
  },
  lastname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    min: 0,
    max: 11
},
  email: {
      type: String,
      required: true
  },
  phonenumber: {
    type: String,
    required: true
  },
  password: { 
      type: String,
      required: true,
      min: 8
  }
},
{timestamps: true}
)


const User = mongoose.model('User', UserSchema)
module.exports = User;