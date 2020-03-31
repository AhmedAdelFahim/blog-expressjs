const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const saltRounds = 10;
const UserSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    }, lastName:{
        type:String,
        required:true,
    } , email:{
        type:String,
        match:/^.+@.+\..+$/
    } ,
    password:{
        type:String,
        minlength:6
    },
    posts:[{type:mongoose.Schema.Types.ObjectId, ref:'Post'}]
})


UserSchema.pre('save',async function (next) {
    if(!this.isModified('password')) return next()
    const hashedPass = await bcrypt.hash(this.password, saltRounds)
    this.password = hashedPass
    next()
})

const User = mongoose.model('User',UserSchema);

module.exports = User
