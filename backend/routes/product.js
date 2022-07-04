const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const { getProducts, getProduct, newProduct, updateProduct, deleteProduct } = require('../controllers/productController');

router.route('/products').get(getProducts);//get all products
router.route('/product/:id').get(getProduct);//get single product
router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);//add new product
router.route('/admin/product/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)//update a product
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);//delete a product

module.exports = router;