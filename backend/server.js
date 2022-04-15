const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

//HANDLE uncaught exceptions
process.on('uncaughtException', error => {
    console.log(`ERROR: ${error.stack}`);
    console.log('Closing the server due to Uncaught Exceptions!');
    process.exit(1);
});

//set up config
dotenv.config({ path: 'backend/config/config.env' });

//Test uncaught exception
// console.log(a);

//connect database
connectDB();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});

//HANDLE unhandled promise rejections
process.on('unhandledRejection', error => {
    console.log(`ERROR: ${error.message}`);
    console.log('Closing the server due to Unhandled Promise Rejection!');
    server.close(() => {
        process.exit(1);
    });
});