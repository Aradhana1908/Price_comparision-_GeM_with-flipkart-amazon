const mongoose=require('mongoose')
const csvParser=require('csv-parser')
const fs=require('fs')
mongoose.connect('mongodb://127.0.0.1:27017/Flipkart')
.then(()=>console.log("Connected")).catch(err=>console.log("Error",err))
const userSchema=new mongoose.Schema({
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
const User=mongoose.model('FlipkartData',userSchema)
fs.createReadStream("flipkartLaptop.csv")
.pipe(csvParser())
.on('data',(row)=>{
    const Model=new User(row)
    Model.save();
}).on('end',()=>{
    console.log("Csv Data Imported to Mongodb")
})
async function FlipkartData(query){
    const regexPattern = query.split(' ').map(word => `(?=.*${word})`).join('');
    console.log(regexPattern)
    try {
        const result = await User.find({ "Name": { $regex: new RegExp(regexPattern, 'i') } });
        const uniqueCombinations = new Set(result.map(item => `${item.Name}-${item.Price}`));

    // Extract details for the unique combinations
        const uniqueDetails = [...uniqueCombinations].map(combination => {
        const [name, price] = combination.split('-');
        const matchingItem = result.find(item => item.Name === name && item.Price === price);
        return {
            Name: name,
            Description: matchingItem.Description,
            Price: price,
            Rating: matchingItem.Rating,
            Image: matchingItem.Image
            };
        });
        console.log("Error",uniqueDetails)
        return uniqueDetails;
    }catch(err){
        console.log("Internal Error")
    }


}
module.exports=FlipkartData