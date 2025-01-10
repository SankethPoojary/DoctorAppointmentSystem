const mongoose = require('mongoose');
const crypto = require('crypto');

const countrySchema = new mongoose.Schema(
    {
        country_code: {
            type: String,
            default:''
        },
        country_name: {
            type: String,
            default:''
        },
        deleted_status:{
            type:String,
            default:false
        }
    },
    { timestamp: true }
);

module.exports = mongoose.model('country', countrySchema);