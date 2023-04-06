const express = require('express');
const Pictrue = require('../models/Picture');
const Picture = require('../models/Picture');


const router = new express.Router();

router.get('/',async (req,res)=>{
    try{
        let username = req.username;
        const pictures = await Picture.find({ user:username});
        return res.status(200).send(pictures);

    }catch(err){
        return res.status(500).send("some error occured");
    }
  





});
router.get('/:id',async (req,res)=>{
      try{
        let username = req.username;
        const picture = await Picture.findOne({ _id:req.params.id, user: username});
        if(!picture) return res.status(404).send("not found");
        return res.status(200).send(picture);

    }catch(err){
        return res.status(500).send("some error occured");
    }

});
router.post('/', async(req,res)=>{
   
    try{
        let username = req.username;
        let {src , title} = req.body;
        if(!src) return res.status(400).send("bad request")
        let picture = new Picture({src , title, user:username});
        await picture.save();
        
        res.status(201).send(picture);
        
    }catch(err){
        return res.status(500).send("some error occured");
    }

});
router.put('/:id',async (req,res)=>{
    try{
        let username = req.username;
        let id = req.params.id;
        let body = req.body;
        let picture = Picture.findOneAndUpdate({_id:id, user:username}, body, {new : true});
        if(!picture) return res.status(404).send("not found");
        return res.status(204).send(picture);
    }catch(err){
        return res.status(500).send("some error occured");
    }

})
router.delete('/:id', async (req,res)=>{
    try{
        let username = req.username;
        let id = req.params.id;
        await Picture.deleteOne({_id:id, user:username})
        return res.status(202).send({deleted:true})
    

    }catch(err){
        return res.status(500).send("some error occured");
    }
})



module.exports = router;