const mongoose=require('mongoose')
const csvparser=require('csv-parser')
const fs=require('fs')
const {GemModel,FlipkartModel,AmazonModel} =require('./modelClass')
mongoose.connect('mongodb://127.0.0.1:27017/DataStorage')
.then(()=>console.log("Connected")).catch(err=>console.log("Error",err))
function AddData(){
    fs.createReadStream('gemData.csv')
    .pipe(csvparser())
    .on('data',(row)=>{
        const Model=new GemModel(row)
        Model.save();
    }).on('end',()=>{
        console.log('Added')
    })
    fs.createReadStream('amazon.csv')
    .pipe(csvparser())
    .on('data',(row)=>{
        const Model=new AmazonModel(row)
        Model.save();
    }).on('end',()=>{
        console.log('Amazon Added')
    })
    fs.createReadStream('flipkartLaptop.csv')
    .pipe(csvparser())
    .on('data',(row)=>{
        const Model=new FlipkartModel(row)
        Model.save();
    }).on('end',()=>{
        console.log('Flipkart Data Added')
    })
}
module.exports={AddData};