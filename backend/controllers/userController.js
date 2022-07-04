const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const CatchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendTokenToCookie = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

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

//Logout => /api/v1/logout
exports.logout = CatchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).json({
        success: true,
        message: 'Logged out'
    });
});

//Forgot Password => /api/v1/password/forgot
exports.forgotPassword = CatchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandler('User not found with this email!', 404));
    }

    //Get reset token
    const resetToken = user.getResetPasswordToken();
    console.log(`Reset token of forgotPassword function in UserController is ${resetToken}`);
    await user.save({ validateBeforeSave: false });

    //Create reset password URL
    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;
    const message = `Your password reset token is as follow:\n\n${resetURL}\n\nIf you have not requested this email, then ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'NodeShopTest Password Recovery',
            message
        });
        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }
});

//Reset Password => /api/v1/password/reset/:token
exports.resetPassword = CatchAsyncErrors(async (req, res, next) => {
    //Hash URL Token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });
    if (!user) {
        return next(new ErrorHandler('Password reset token is invalid or has been expired'), 400);
    }
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match', 400));
    }
    //Setup new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    sendTokenToCookie(user, 200, res);
});

//Get current logged in user detail => /api/v1/me
exports.getUserProfile = CatchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    });
});
//Update/Change password => /api/v1/password/update
exports.updatePassword = CatchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');
    //check previous user password
    const isMatched = await user.comparePassword(req.body.oldpassword);
    if (!isMatched) {
        return next(new ErrorHandler('Old password is incorrect', 400));
    }
    user.password = req.body.password;
    await user.save();
    sendTokenToCookie(user, 200, res);
});
//Update user profile => /api/v1/me/update
exports.updateProfile = CatchAsyncErrors(async (req, res, next) => {
    const newUserProfile = {
        name: req.body.name,
        email: req.body.email
    };
    //update user profile picture --TODO
    const user = await User.findByIdAndUpdate(req.user.id, newUserProfile, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        message: 'User profile is updated.'
    });
});

//Admin
//get all users => /api/v1/admin/users
exports.getAllUsers = CatchAsyncErrors(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        message: 'get all users for only admins',
        users
    });
});
//get user details => /api/v1/admin/users/:id
exports.getUserDetails = CatchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler(`User does not found with id ${req.params.id}`, 404));
    }
    res.status(200).json({
        success: true,
        message: 'get user details for only admins',
        user
    });
});