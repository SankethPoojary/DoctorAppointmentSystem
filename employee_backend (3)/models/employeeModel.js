const mongoose = require('mongoose');
const crypto = require('crypto');

const employeeSchema = new mongoose.Schema(
    {
        employee_name: {
            type: String,
            default:''
        },
        employee_email: {
            type: String,
            default:''
        },
        employee_password: {
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

module.exports = mongoose.model('employee', employeeSchema);