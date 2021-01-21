const express = require('express');
const router = express.Router()
const Products = require('../../models/products')


router.get('/', async (req, res) => {
    // get posts from posts
    const products = await Products.find();
    res.json({
        success: true,
        status: 200, //ok
        data: products
    })

});
router.post('/add-product', async (req, res) => {
    console.log(".......", req.body)
    try {
        const product = await Products.create(req.body)
        res.json({
            success: true,
            status: 201,
            dbid: product._id
        })

    } catch (error) {
        res.json({
            success: false,
            status: 400,
            error
            
        })

    }


});
router.get('/:id', async (req, res) => {
    const product = await Products.findById(req.params.id);
    res.json({
        success: true,
        status: 200, //ok
        data: product
    })

})

router.delete('/:id', async (req, res) => {
    try {
         const product = await Products.findByIdAndDelete(req.params.id);
    res.json({
        success: true,
        status: 200, //ok
        msg: 'product is deleted successfully'
    })
   
    } catch (error) {
        console.log(error)
    }

})
module.exports = router