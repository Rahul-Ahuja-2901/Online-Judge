const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const DBConnection = async () => {
    const MONGO_URL = process.env.MONGO_URL;

    try {
        await mongoose.connect(MONGO_URL);
        console.log("Database Connection Established");
    }
    catch (error) {
        console.log("Error connecting to Database", error.message);
    }
}

module.exports = {DBConnection};
