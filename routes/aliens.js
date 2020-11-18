const { json } = require('express')
const express= require('express')
const router=express.Router()
const Alien= require('../model/alien')

router.get('/',async(req,res)=>{
   try{
    const aliens= await Alien.find()
    res.json(aliens)
   }    
   catch(err){
       console.log('Error '+err)

   }
})

router.get('/:id',async(req,res)=>{
    try{
     const alien= await Alien.findById(req.params.id)
     res.json(alien)
    }    
    catch(err){
        res.send('Try giving a valid id')
 
    }
 })

 router.patch('/:id',async(req,res)=>{
    try{
     const alien= await Alien.findById(req.params.id)
     alien.sub= req.body.sub
     const message= await alien.save()
     res.json(alien)
    }    
    catch(err){
        res.send('Try giving an existing id')
 
    }
 })


router.post('/',async(req,res)=>{
    const alien= new Alien({
        name: req.body.name,
        tech: req.body.tech,
        sub: req.body.sub
    })
    try{
        const message= await alien.save()
        res.json(message)
    }
    catch(err){
        res.send('Error'+err)
    }

})

router.delete('/:id',async(req,res)=>{
    try{
        const alien= await Alien.findById(req.params.id)
        const message= await alien.remove()
        res.json('The entry is removed')
    }catch(err){
        res.send('Try giving an existing id')
    }
})

module.exports= router