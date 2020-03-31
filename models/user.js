const mongoose = require('mongoose');

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

const User = mongoose.model('User',UserSchema);

module.exports = User
