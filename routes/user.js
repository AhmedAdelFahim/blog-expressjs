const express = require('express');
const User = require('../models/user');
const Post = require('../models/post');

const router = express.Router();

router.get('/',(req,res) => {
    User.find({}).exec((error,users)=>{
        if(error) return res.json({error:error.toString()})
        res.json(users)
    })
    // res.send("AAA")
})

router.get('/:id',(req,res,next) => {
    User.findById(req.params.id,(error,user)=>{
        if(error) next("User Not found with this id")
        res.json(user)
    })
})

router.post('/',(req,res,next) => {
    const { body: {firstName,lastName,email,password,posts}} = req;

    User.create({firstName,lastName,email,password,posts},(error,user)=>{
        if(error) return res.json({error:error.toString()})
        res.json(user)
    })
})

router.patch('/:id', async (req,res,next) => {
    /*const { body: {firstName,lastName,email,password,posts}} = req;
    User.findByIdAndUpdate(req.params.id,{firstName,lastName,email,password,posts},{new:true},(error,user)=>{
        if(error) return res.json({error:error.toString()})
        res.json(user)
    })*/
    const updatesKeys = Object.keys(req.body)
    try{
        let user = await User.findById(req.params.id).exec();
        updatesKeys.forEach((key) => {
            user[key] = req.body[key]
        })
        await user.save()
        res.json(user)
        // throw new Error("User not exist");
    } catch (e) {
        // throw new Error("User not exist");
        next("User not exist")
    }

})

router.delete('/:id',(req,res) => {
    User.findByIdAndRemove(req.params.id,(error,user)=>{
        if(error) return res.json({error:error.toString()})
        res.json(user)
    })
})

router.get('/:userId/posts',async (req,res)=>{
    const posts = await Post.find({author:req.params.userId}).exec()
    res.json(posts)
})

module.exports = router
