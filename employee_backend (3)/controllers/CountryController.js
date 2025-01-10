'use strict';
const e = require('express');
// var sha1 = require('sha1');
var randtoken = require('rand-token');
var mongoose = require('mongoose'),
    con = mongoose.model('country');
var moment = require('moment');

exports.add_country = function (req, res) {

    con.find({ country_name: req.body.country_name }, function (err, num) {
        if (num.length >= 1) {
            res.json({ msg: 'This country exist!!!', error: true });
        } else {

            var body = req.body;
            console.log(body)
            var new_con = new con({

                country_code: body.country_code,
                country_name: body.country_name,
                
            });

            new_con.save(function (err, task) {
                if (err)
                    res.send(err);
                res.json(task);
            });
        }
    });
}

exports.con_list = function (req, res) {
    var list = []
    con.find({ deleted_status: false }, function (err, resp) {
      if (err) {
        return res.status(400).json({
          error: err
        });
      } else {
        for (var i = 0; i < resp.length; i++) {
          list.push({
            sno: i + 1,
            _id: resp[i]._id,
            country_code: resp[i].country_code,
            country_name: resp[i].country_name
          })
        }
        res.json({ country_list: list, error: false });
      }
    });
  };