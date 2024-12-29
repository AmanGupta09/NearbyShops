const mongoose=require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: [true, 'USERNAME REQUIRED']
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'EMAIL REQUIRED']
  },
  password: {
    type: String,
    trim: true,
    required: [
      function () {
        return !this.google_id;
      },
      "PASSWORD IS REQUIRED"
    ]
  },
  isActive: {
    type: Boolean,
    default: false
  },
  isRetailer: {
    type: Boolean,
    default: false
  },
  role: {
    type: Number,
    default: 3,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  google_id: { // Optional key
    type: String,
    trim: true // Trim whitespace if any
  }
});


module.exports=mongoose.model('user',userSchema)