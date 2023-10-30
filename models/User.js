const mongoose = require('mongoose');
const validator = require('validator');
// const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxlength: [30, 'Name should not exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password should be atleast 6 characters'],
        select: false // means when we want to display user then password should not be displayed
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Encrypting password before saving the user
// UserSchema.pre('save', async function(next) {
//     if(!this.isModified('password')) { // this makes sure that password is changed
//         next();
//     }

//     this.password = await bcrypt.hash(this.password, 10);
// })

module.exports = mongoose.model('user', UserSchema);