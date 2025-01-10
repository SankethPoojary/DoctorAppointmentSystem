const mongoose = require('mongoose');
const crypto = require('crypto');

const citySchema = new mongoose.Schema(
    {
        city_id: {
            type: String,
            default:''
        },
        city_name: {
            type: String,
            default:''
        },
        state_id: {
            type: String,
            default:''
        },
        country_id: {
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

module.exports = mongoose.model('city', citySchema);