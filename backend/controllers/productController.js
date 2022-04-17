const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const CatchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

//GET all products => /api/v1/products
exports.getProducts = CatchAsyncErrors(async (req, res, next) => {
    const resPerPage = 2;
    const totalProducts = await Product.countDocuments();
    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resPerPage);

    const products = await apiFeatures.query;
    // const products = await Product.find();
    res.status(200).json({
        success: true,
        message: 'show all products in database.',
        count: products.length,
        totalProducts,
        products
    });
});

//GET a product => /api/v1/product/:id
exports.getProduct = CatchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        // return res.status(404).json({
        //     success: false,
        //     message: 'Product not found!'
        // });
        return next(new ErrorHandler('Product not found!', 404));
    }
    res.status(200).json({
        success: true,
        product
    });
});

//CREATE new product => /api/v1/admin/product/new
exports.newProduct = CatchAsyncErrors(async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    });
});

//UPDATE a product => /api/v1/admin/product/:id
exports.updateProduct = CatchAsyncErrors(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found!', 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    });
});

//DELETE a product => /api/v1/admin/product/:id
exports.deleteProduct = CatchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler('Product not found!', 404));
    }
    await product.remove();
    res.status(200).json({
        success: true,
        message: 'Product is deleted.'
    });
});