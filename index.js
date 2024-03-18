const express=require('express')
const cors=require('cors')
const {GemModel,FlipkartModel,AmazonModel} =require('./modelClass')
const {AddData}=require('./AddDataIntoMongodb')
const app=express()
const PORT=8000;
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.get('/api/findByNameSubstring/:substring', async (req, res) => {
    const { substring } = req.params;
    // console.log(substring)
    const regexPattern = substring.split(' ').map(word => `(?=.*${word})`).join('');
    // console.log(regexPattern)
    try {
        const resultGem = await GemModel.find({ "Name": { $regex: new RegExp(regexPattern, 'i') } });
        const uniqueCombinationsGem = new Set(resultGem.map(item => `${item.Name}_${item.Price}`));
    // Extract details for the unique combinations
        const uniqueDetailsGem = [...uniqueCombinationsGem].map(combination => {
        const [name, price] = combination.split('_');
        const matchingItem = resultGem.find(item => item.Name === name && item.Price === price);
        if(matchingItem){
            return {
                Name: name,
                Price: price,
                Rating: matchingItem.Rating,
                Image: matchingItem.Image
            };
        }else{
            return null;
        }
    });
    const resultFlipkart = await FlipkartModel.find({ "Name": { $regex: new RegExp(regexPattern, 'i') } });
        const uniqueCombinationsFlipkart = new Set( resultFlipkart .map(item => `${item.Name}_${item.Price}`));
    // Extract details for the unique combinations
        const uniqueDetailsFlipkart = [...uniqueCombinationsFlipkart].map(combination => {
        const [name, price] = combination.split('_');
        const matchingItem = resultFlipkart.find(item => item.Name === name && item.Price === price);
        if(matchingItem){
            return {
                Name: name,
                Description:matchingItem.Description,
                Price: price,
                Rating: matchingItem.Rating,
                Image: matchingItem.Image
            };
        }else{
            return null;
        }
    });
    const resultAmazon = await AmazonModel.find({ "Name": { $regex: new RegExp(regexPattern, 'i') } });
        const uniqueCombinationsAmazon = new Set(resultAmazon.map(item => `${item.Name}_${item.Price}`));
    // Extract details for the unique combinations
        const uniqueDetailsAmazon = [...uniqueCombinationsAmazon].map(combination => {
        const [name, price] = combination.split('_');
        const matchingItem = resultAmazon.find(item => item.Name === name && item.Price === price);
        if(matchingItem){
            return {
                Name: name,
                Price: price,
                Rating: matchingItem.Rating,
                Image: matchingItem.Image
            };
        }else{
            return null;
        }
    });
        res.json({"AmazonOutput":uniqueDetailsAmazon,"GemOutput":uniqueDetailsGem,"FlipkartOutput":uniqueDetailsFlipkart});
    } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
app.listen(PORT,()=>{
    console.log("Server Started")
})
// const mongoose = require('mongoose');
// const express = require('express');
// const fs = require('fs');
// const csvParser = require('csv-parser');
// const app = express();
// const PORT = 8000;

// mongoose.connect('mongodb://127.0.0.1:27017/CSVData')
//   .then(() => console.log("Connected"))
//   .catch(err => console.log("Error", err));

// const userSchema = new mongoose.Schema({
//   "Name": {
//     type: String,
//     required: true
//   },
//   "Price": {
//     type: String,
//     required: true
//   },
//   "Rating": {
//     type: String,
//     required: true
//   },
//   "Image": {
//     type: String,
//     required: true
//   }
// });

// const User = mongoose.model('GEMData', userSchema);

// app.use(express.json());

// fs.createReadStream("gemData.csv")
//   .pipe(csvParser())
//   .on('data', (row) => {
//     const model = new User(row);
//     model.save();
//   })
//   .on('end', () => {
//     console.log("Csv Data Imported to Mongodb");
//   });

// app.get('/api/findByNameSubstring/:substring', async (req, res) => {
//   const { substring } = req.params;
//   console.log(substring);

//   // Create a regex pattern for the entire substring
//   const regexPattern = substring.split(' ').map(word => `(?=.*${word})`).join('');

//   try {
//     const result = await User.find({ "Name": { $regex: new RegExp(regexPattern, 'i') } });
//     console.log(result);
//     res.json(result);
//   } catch (err) {
//     console.error("Error:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.listen(PORT, () => {
//   console.log("Server Started");
// });
