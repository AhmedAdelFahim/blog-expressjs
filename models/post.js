const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    }, content:{
        type:String,
        required:true,
    }, author:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }
})

const Post = mongoose.model('Post',PostSchema);

module.exports = Post
