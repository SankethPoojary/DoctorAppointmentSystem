'use strict';
const e = require('express');
// var sha1 = require('sha1');
var randtoken = require('rand-token');
var mongoose = require('mongoose'),
    cust = mongoose.model('customer');
var moment = require('moment');

exports.add_customer = function (req, res) {

    cust.find({ customer_email: req.body.customer_email }, function (err, num) {
        if (num.length >= 1) {
            for (var i = 0; i <= num.length; i++) {
                if (num[i].email === req.body.customer_email) {
                    return err;
                }
            }
        } else {

            var body = req.body;
            console.log(body)
            var new_cust = new cust({

                customer_name: body.employee_name,
                customer_email: body.employee_email,
                customer_password: body.employee_password,
                created_date: moment().utcOffset("+05:30").format("DD MMM, YYYY hh:mm a")
                
                
            });

            new_cust.save(function (err, task) {
                if (err)
                    res.send(err);
                res.json(task);
            });
        }
    });
}

exports.cust_list = function (req, res) {
    var list = []
    cust.find({ deleted_status: false }, function (err, resp) {
      if (err) {
        return res.status(400).json({
          error: err
        });
      } else {
        for (var i = 0; i < resp.length; i++) {
          list.push({
            sno: i + 1,
            _id: resp[i]._id,
            name: resp[i].customer_name,
            email: resp[i].customer_email,
            password: resp[i].customer_password,
          })
        }
        res.json({ cust_list: list, error: false });
      }
    });
  
  
  };
  exports.cust_list_by_id = function (req, res) {
    var list = []
    cust.find({ _id:req.body._id }, function (err, resp) {
      if (err) {
        return res.status(400).json({
          error: err
        });
      } else {
        for (var i = 0; i < resp.length; i++) {
          list.push({
            sno: i + 1,
            _id: resp[i]._id,
            customer_name: resp[i].customer_name,
            customer_email: resp[i].customer_email,
            customer_password: resp[i].customer_password,
          })
        }
        res.json({ customer_list: list, error: false });
      }
    });
  
  };

  exports.cust_update = async function (req, res) {

    if (!req.body.cust_id) {
      return res.status(400).json({
        error: 'Missing customer id'
      });
    } else {
      var query = {
        customer_name: req.body.employee_name,
        customer_email: req.body.employee_email,
        customer_password: req.body.employee_password,
        
      }
  
      await cust.findOneAndUpdate({ _id: req.body.cust_id }, query);
      res.json({
        message: "Updated successfully"
      });
    }
  }

  exports.cust_delete = async function (req, res) {

    if (!req.body._id) {
      return res.status(400).json({
        error: 'Missing customer id'
      });
    } else {
      var query = {
        deleted_status: true, _id: req.body._id    
      }
      await cust.findOneAndUpdate({ _id: req.body._id }, query);
      res.json({
        message: "deleted successfully"
      });
    }
  }





