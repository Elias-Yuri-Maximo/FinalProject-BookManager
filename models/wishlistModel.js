const mongoose = require('mongoose');

const { Schema } = mongoose; // Is like  mongoose.Schema

const mySchema = new Schema({
    authorFName: {
        type: String,
        required: true,
    },
    authorLName: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
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
