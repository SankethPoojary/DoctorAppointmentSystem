const mongoose = require('mongoose');
const crypto = require('crypto');

const regSchema = new mongoose.Schema(
    {
        user_name: {
            type: String,
            default:''
        },
        user_email: {
            type: String,
            default:''
        },
        user_password: {
            type: String,
            default: ""
        },
        created_date: {
            type: Date,
            default: Date.now
        },
        deleted_status:{
            type:String,
            default:false
        }
    },
    { timestamp: true }
);

module.exports = mongoose.model('registration', regSchema);