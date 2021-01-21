const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    title: {type:String, required:[true, "title is missing"] },
    description: String,
    user: String,
    img:String,
    date: {
        type: Date,
        default: new Date()
    }
    
})
const Products = mongoose.model('Products', productSchema)
module.exports = Products