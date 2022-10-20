const db = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGODB_URI;

const connectDB = async () => {
    await db.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'books_db',
    });
    console.log('DB connected, wohooo!');
};

module.exports = connectDB;