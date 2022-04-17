const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const CatchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendTokenToCookie = require('../utils/jwtToken');

//register a user => /api/v1/register
exports.registerUser = CatchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'avatars/Zaw-Zaw-1_kznatv',
            url: 'https://res.cloudinary.com/nodeshoptest/image/upload/v1650195404/avatars/Zaw-Zaw-1_kznatv.jpg'
        }
    });

    // const token = user.getJwtToken();

    // res.status(201).json({
    //     success: true,
    //     token,
    //     user
    // });
    sendTokenToCookie(user, 200, res);
});

//login user => /api/v1/login
exports.loginUser = CatchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    //check if email and password is entered by user
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400));
    }
    //find user in the database
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }
    //check if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    // const token = user.getJwtToken();

    // res.status(200).json({
    //     success: true,
    //     token
    // })
    sendTokenToCookie(user, 200, res);
});