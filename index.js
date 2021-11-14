const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const connectdb = require('./database/db');
const PersonModel = require('./models/person');
app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
connectdb();
//create a document
app.post('/createperson',async(req,res)=>{
    try{
        const {name,age,favoriteFoods} = req.body;
        let person = await PersonModel.create({name,age,favoriteFoods})
        res.status(200).json({staus:true,message:'person created'})
    }catch(err){
        console.log(err);
        res.status(500).json({status:false,message:err});
    }
});
//get all the document from the person collection
app.get('/find',async(req,res)=>{
    try{
        let person = await PersonModel.find();        
        res.status(200).json({status:true,message:'person list',data:person});
    }
    catch(err){
        console.log(err);
        res.status(500).json({status:false,message:err});
   
    }

});
//Find just one person which has a certain food in the person's favorites
app.get('/find/:id',async(req,res)=>{
    try{
        const {id} = req.params; 
        let person = await PersonModel.findOne({favoriteFoods:id});
        res.status(200).json({status:true,message:'person list',data:person});
    }
    catch(err){
        console.log(err);
        res.status(500).json({status:false,message:err});
   
    }

});
//Find the (only!!) person having a given _id
app.get('/findbyid/:id',async(req,res)=>{
    try{
        const {id} = req.params
        const person = await PersonModel.findById(id);
        res.status(200).json({status:true,message:'person',data:person})
    }catch(err){
        console.log(err);
        res.status(500).json({status:false,message:err})
    }
});

//Find a person by _id . Add "hamburger" to the list of the person's favoriteFoods 
app.get('/findandupdate/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const updatePerson = await PersonModel.findOneAndUpdate({_id:id},{$push:{favoriteFoods:"hamburger"}});
        console.log(updatePerson)
        res.status(200).json({status:true,message:'the hamburger is add in the array',data:updatePerson})
    }catch(err){
        console.log(err);
        res.status(500).json({status:false,message:err})
    }
});
//updat the age by person name
app.get('/updateage',async(req,res)=>{
    try
    {
        const {name} = req.query
        const updatePersonAge = await PersonModel.findOneAndUpdate({name:name},{age:20});
        res.status(200).json({status:true,message:'the age of the person is update',data:updatePersonAge})
    }catch(err){
        console.log(err);
        res.status(500).json({status:false,message:err})
    }
});
//Delete one person by the person's _id
app.get('/remove/:id',async(req,res)=>{
    try
    {
        const {id} = req.params
        const removePerson = await PersonModel.findByIdAndRemove({_id:id})
        res.status(200).json({status:true,message:'the person is removed',data:removePerson})
    }catch(err){
        console.log(err);
        res.status(500).json({status:false,message:err})
    }
});
//Delete all the people whose name is “Mary”
app.get('/remove',async(req,res)=>{
    try
    {
        const removePerson = await PersonModel.remove({name:'mary'})
        res.status(200).json({status:true,message:'the person is removed',data:removePerson})
    }catch(err){
        console.log(err);
        res.status(500).json({status:false,message:err})
    }
});
app.get('/likeburritos',async(req,res)=>{
    try
    {
        const person = await PersonModel.find({favoriteFoods:"burritos"},{age:0}).sort({name:1}).limit(2);
        res.status(200).json({status:true,message:"the people who like burritos",data:person})
    }catch(err){
        console.log(err);
        res.status(500).json({status:false,message:err})
    }

})
app.listen(port,()=>console.log('server running on port ' + port));