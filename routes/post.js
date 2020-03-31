const express = require('express');
const Post = require('../models/post');
const router = express.Router();

router.get('/',(req,res) => {
    Post.find({},(error,posts)=>{
        if(error) return res.json({error:error.toString()})
        res.json(posts)
    })
    // res.send("AAA")
})

router.get('/:id',(req,res) => {
    Post.findById(req.params.id,(error,post)=>{
        if(error) return res.json({error:error.toString()})
        res.json(post)
    })
})
router.post('/',(req,res) => {
    const { body: {title,content}} = req;

    Post.create({title, content},(error,post)=>{
        if(error) return res.json({error:error.toString()})
        res.json(post)
    })
})

router.patch('/:id',(req,res) => {
    const { body: {title,content}} = req;
    Post.findByIdAndUpdate(req.params.id,{title,content},(error,post)=>{
        if(error) return res.json({error:error.toString()})
        res.json(post)
    })
})
router.delete('/:id',(req,res) => {
    Post.findByIdAndRemove(req.params.id,(error,post)=>{
        if(error) return res.json({error:error.toString()})
        res.json(post)
    })
})
/*




*/

module.exports = router
