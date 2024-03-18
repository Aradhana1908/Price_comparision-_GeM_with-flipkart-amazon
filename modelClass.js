const mongoose=require('mongoose')
const GemdataSchema=new mongoose.Schema({
    "Name":{
        type:String,
        required:true
    },
    "Price":{
        type:String,
        required:true
    },
    "Rating":{
        type:String,
        require:true
    },
    "Image":{
        type:String,
        required:true
    }
})
const flipkartSchema=new mongoose.Schema({
    "Name":{
        type:String,
        required:true
    },
    "Price":{
        type:String,
        required:true
    },
    "Rating":{
        type:String,
        require:true
    },
    "Image":{
        type:String,
        required:true
    },
    "Description":{
        type:String,
        required:true
    }
})
const amazonSchema=new mongoose.Schema({
    "Name":{
        type:String,
        required:true
    },
    "Price":{
        type:String,
        required:true
    },
    "Rating":{
        type:String,
        require:true
    },
    "Image":{
        type:String,
        required:true
    }
})
const GemModel=mongoose.model("GemDataModel",GemdataSchema)
const FlipkartModel=mongoose.model('Flipkart',flipkartSchema)
const AmazonModel=mongoose.model('AmazonModel',amazonSchema)
module.exports={
    GemModel,
    FlipkartModel,
    AmazonModel
}