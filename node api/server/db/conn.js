const mongoose = require("mongoose");

const uri = process.env.DATABASE

async function connectToMongoDB() {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB via Mongoose");
        return mongoose.connection;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

module.exports = connectToMongoDB;
