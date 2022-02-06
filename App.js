//putting all the important data

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app=express();

mongoose.connect("mongodb://127.0.0.1:27017/",{useNewUrlParser:true, useUnifiedTopology:true}).then(()=>{
    console.log("connected with database")
}).catch((err)=>{
    console.log(err)
})

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json())


const productSchema = new mongoose.Schema({
    name:String,
    description:String,
    price:Number
})

const Product = new mongoose.model("Product",productSchema)

//this is basically for creating api

//create product

app.post("/api/v1/product/new",async(req,res)=>{
 const product = await Product.create(req.body);
res.status(200).json({
    success:true,
    product
})
})


//Read Product
app.get("/api/v1/products", async(req,res)=>{
    const product = await Product.find();
    res.status(200).json({
        success:true,
        product
    })
})

//Update product
app.put("/api/v1/product/:id",async(req,res)=>{
    let product= await Product.findById(req.params.id);

    if (!product){
        return res.status(500).json({
            success:false,
            message:"product not found"
        })
    }

    product=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,
    useFindAndModify:false,
runValidators:true})

res.status(200).json({
    success:true,product
})

})

//Delete Product
app.delete("/api/v1/product/:id",async(req,res)=>{

const product = await Product.findById(req.params.id);


if (!product){
    return res.status(500).json({
        success:false,
        message:"product not found"
    })
}
product.remove();


    res.status(200).json({
        success:true,
        message:"product is deleted"
    })
})



app.listen(4500, ()=>{
    console.log("your server is running")

})