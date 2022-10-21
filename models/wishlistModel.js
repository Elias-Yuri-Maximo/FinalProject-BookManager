const mongoose = require('mongoose');

const { Schema } = mongoose; // Is like  mongoose.Schema

const mySchema = new Schema({
    authorFName: {
        type: String,
    },
    authorLName: {
        type: String,
    },
    user: {
        type: String,
    },
    title: {
        type: String,
    },
    genre: {
        type: String,
    },
    pages: {
        type: String,
    },
    preview: {
        type: String,
    },
});

const WishListModel = mongoose.model('wishlist', mySchema);
module.exports = WishListModel;
