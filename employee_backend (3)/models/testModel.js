const mongoose = require('mongoose');
const crypto = require('crypto');

const testSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default:''
        },
        password: {
            type: String,
            default:''
        },
        email: {
            type: String,
            default: ""
        },
        username: {
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

module.exports = mongoose.model('test', testSchema);