const mongoose = require("mongoose");

const productSchema = ({
    name:{
        type:String,
        required:[true,"Please Enter Product Name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please Enter Product description"]
    },
    price:{
        type:Number,
        required:[true,"Please Enter Product Price"],
        maxLength:[8,"Price Cannot Exceed 8 Character"]
    },
    rating:{
        type:Number,
        default:0,
    },
    images:[
        {
            public_id:{
                type:String,
                required:true,
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"Please Enter Product Category"]
    },
    stock:{
        type:Number,
        required:[true,"Please Enter Stock Number Of Product"],
        maxLength:[4,"Stock Cannot Excedd 4 Character"]
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
     createAt:{
        type:Date,
        default:Date.now()
     }
})

const Product = mongoose.model("Product",productSchema);
module.exports = Product;