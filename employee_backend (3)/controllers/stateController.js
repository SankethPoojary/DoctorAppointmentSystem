'use strict';
const e = require('express');
// var sha1 = require('sha1');
var randtoken = require('rand-token');
var mongoose = require('mongoose'),
    st = mongoose.model('state'),
    con=mongoose.model('country');
var moment = require('moment');

exports.add_state = function (req, res) {

    st.find({ state_name: req.body.state_name }, function (err, num) {
        if (num.length >= 1) {
            res.json({ msg: 'This state exist!!!', error: true });
        } else {

            var body = req.body;
            console.log(body)
            var new_st = new st({

                state_id: body.state_id,
                state_name: body.state_name,
                country_id:body.country_id
            });

            new_st.save(function (err, task) {
                if (err)
                    res.send(err);
                res.json(task);
            });
        }
    });
}


exports.state_list = function (req, res) {
    var list = []
    st.find({ deleted_status: false }, async function (err, resp) {
      if (err) {
        return res.status(400).json({
          error: err
        });
      } else {
        for (var i = 0; i < resp.length; i++) {
            var countryArr = await con.find({ _id: resp[i].country_id }).exec();
            
            var country_name = "";
            var country_code = "";
            if(countryArr != "" && countryArr != undefined)
            {
              country_name = countryArr[0].country_name;
              country_code = countryArr[0].country_code;
            }
          list.push({
            sno: i + 1,
            _id: resp[i]._id,
            state_id: resp[i].state_id,
            state_name: resp[i].state_name,
            country_code:country_code,
            country_name:country_name
          })
          
        }
        res.json({ state_list: list, error: false });
      }
    });
  };
  exports.state_list_by_id = function (req, res) {
    console.log("api called");
    console.log("id==", req.body._id);
    var list = [];
    st.find({ _id: req.body._id }, function (err, resp) {
        if (err) {
            return res.status(400).json({
                error: err
            });
        } else {
            var processedCount = 0;
            for (var i = 0; i < resp.length; i++) {
                (function (index) {
                    con.findOne({ _id: resp[index].country_id }, function (err, country) {
                        if (err) {
                            return res.status(400).json({
                                error: err
                            });
                        }
                        var country_name = country ? country.country_name : '';
                        list.push({
                            sno: index + 1,
                            _id: resp[index]._id,
                            state_id: resp[index].state_id,
                            state_name: resp[index].state_name,
                            country_id: resp[index].country_id,
                            country_name: country_name
                        });
                        processedCount++;
                        if (processedCount === resp.length) {
                            res.json({ state_list: list, error: false });
                        }
                    });
                })(i);
            }
        }
    });
};



  exports.state_update = async function (req, res) {

    if (!req.body._id) {
      return res.status(400).json({
        error: 'Missing state id'
      });
    } else {
      var query = {
        state_id: req.body.state_id,
        state_name: req.body.state_name,
        country_id: req.body.country_id
        //country_name: req.body.country_name      
      }
  
      await st.findOneAndUpdate({ _id: req.body._id }, query);
      res.json({
        message: "Updated successfully"
      });
    }
  }

  exports.state_delete = async function (req, res) {

    if (!req.body._id) {
      return res.status(400).json({
        error: 'Missing state id'
      });
    } else {
      var query = {
        deleted_status: true, _id: req.body._id    
      }
      await st.findOneAndUpdate({ _id: req.body._id }, query);
      res.json({
        message: "deleted successfully"
      });
    }
  }

  exports.state_list_by_country_id = function (req, res) {
    var list = [];
    st.find({ country_id: req.body.country_id }, function (err, resp) {
        if (err) {
            return res.status(400).json({
                error: err
            });
        } else {
            var processedCount = 0;
            for (var i = 0; i < resp.length; i++) {
                (function (index) {
                    con.findOne({ _id: resp[index].country_id }, function (err, country) {
                        if (err) {
                            return res.status(400).json({
                                error: err
                            });
                        }
                        var country_name = country ? country.country_name : '';
                        list.push({
                            sno: index + 1,
                            _id: resp[index]._id,
                            state_id: resp[index].state_id,
                            state_name: resp[index].state_name,
                            country_id: resp[index].country_id,
                            country_name: country_name
                        });
                        processedCount++;
                        if (processedCount === resp.length) {
                            res.json({ state_list: list, error: false });
                        }
                    });
                })(i);
            }
        }
    });
};