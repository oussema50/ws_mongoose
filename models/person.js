const mongoose=require('mongoose');
const personSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    age:Number,
    favoriteFoods:[String]
});
module.exports = mongoose.model('person',personSchema)