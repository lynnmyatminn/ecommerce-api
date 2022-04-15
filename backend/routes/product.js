const express = require('express');
const router = express.Router();

const { getProducts, getProduct, newProduct, updateProduct, deleteProduct } = require('../controllers/productController');

router.route('/products').get(getProducts);//get all products
router.route('/product/:id').get(getProduct);//get single product
router.route('/admin/product/new').post(newProduct);//add new product
router.route('/admin/product/:id')
    .put(updateProduct)//update a product
    .delete(deleteProduct);//delete a product

module.exports = router;