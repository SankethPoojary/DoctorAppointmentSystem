const mongoose = require('mongoose');
const crypto = require('crypto');

const imgSchema = new mongoose.Schema(
    {
        img_title: {
            type: String,
            default:''
        },
        img_path: {
            type: String,
            default:''
        }
        },
        { timestamp: true }
);
module.exports = mongoose.model('image', imgSchema);