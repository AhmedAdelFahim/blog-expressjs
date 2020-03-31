const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/',(req,res) => {
    User.find({},(error,users)=>{
        if(error) return res.json({error:error.toString()})
        res.json(users)
    })
    // res.send("AAA")
})

router.get('/:id',(req,res) => {
    User.findById(req.params.id,(error,user)=>{
        if(error) return res.json({error:error.toString()})
        res.json(user)
    })
})

router.post('/',(req,res) => {
    const { body: {firstName,lastName,email,password,posts}} = req;

    User.create({firstName,lastName,email,password,posts},(error,user)=>{
        if(error) return res.json({error:error.toString()})
        res.json(user)
    })
})

router.patch('/:id',(req,res) => {
    const { body: {firstName,lastName,email,password,posts}} = req;
    User.findByIdAndUpdate(req.params.id,{firstName,lastName,email,password,posts},(error,user)=>{
        if(error) return res.json({error:error.toString()})
        res.json(user)
    })
})

router.delete('/:id',(req,res) => {
    User.findByIdAndRemove(req.params.id,(error,user)=>{
        if(error) return res.json({error:error.toString()})
        res.json(user)
    })
})


module.exports = router
