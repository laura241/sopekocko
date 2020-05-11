const mongoose = require('mongoose');


const sauceSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    mainPepper: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    heat: {
        type: Number,
        required: true
    },
    likes: {
        type: Number,
        required: false
    },
    dislikes: {
        type: Number,
        required: false
    },
    usersliked: [String],

    usersdisliked: [String],

    userId: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Sauce', sauceSchema);