const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    title: {type:String, required:[true, "title is missing"] },
    description: String,
    img:String,
    date: {
        type: Date,
        default: new Date()
    }
    
})
const Product = mongoose.model('Product', productSchema)
module.exports = Product