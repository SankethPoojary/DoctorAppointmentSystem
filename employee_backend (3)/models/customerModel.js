const mongoose = require('mongoose');
const crypto = require('crypto');

const custSchema = new mongoose.Schema(
    {
        customer_name: {
            type: String,
            default:''
        },
        customer_email: {
            type: String,
            default:''
        },
        customer_password: {
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

module.exports = mongoose.model('customer', custSchema);