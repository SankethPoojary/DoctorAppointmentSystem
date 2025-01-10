'use strict';
const e = require('express');
// var sha1 = require('sha1');
var randtoken = require('rand-token');
var mongoose = require('mongoose'),
    st = mongoose.model('state'),
    con=mongoose.model('country'),
    cy=mongoose.model('city');
var moment = require('moment');

exports.add_city = function (req, res) {
    const add_city = (req, res) => {
        const { city_id, city_name, country_id, state_id } = req.body;
        console.log('Received data:', city_id, city_name,country_id, state_id);
    };
    cy.find({ city_name: req.body.name }, function (err, num) {
        if (num.length >= 1) {
            res.json({ msg: 'This city exist!!!', error: true });
        } else {

            var body = req.body;
            console.log(body)
            var new_cy = new cy({

                city_id: body.city_id,
                city_name: body.city_name,
                state_id:body.state_id,
                country_id:body.country_id
            });

            new_cy.save(function (err, task) {
                if (err)
                    res.send(err);
                res.json(task);
            });
        }
    });
}

exports.city_list = function (req, res) {
  var list = [];
  cy.find({ deleted_status: false }, async function (err, resp) {
      if (err) {
          return res.status(400).json({
              error: err
          });
      } else {
          for (var i = 0; i < resp.length; i++) {
              var stateArr = await st.find({ _id: resp[i].state_id }).exec();
              var country_name = "";
              var state_name = "";
              if (stateArr != "" && stateArr != undefined) {
                  state_name = stateArr[0].state_name;
              }
              var countryArr = await con.find({ _id: resp[i].country_id }).exec();
              if (countryArr != "" && countryArr != undefined) {
                  country_name = countryArr[0].country_name;
              }
              list.push({
                  sno: i + 1,
                  _id: resp[i]._id,
                  city_id: resp[i].city_id,
                  city_name: resp[i].city_name,
                  state_name: state_name,
                  country_name: country_name
              })
          }
          res.json({ city_list: list, error: false });
      }
  });
};


exports.city_list_by_id = async function (req, res) {
    console.log("api called");
    console.log("id==", req.body._id);
    try {
        const cities = await cy.find({ _id: req.body._id }).exec();
        const list = [];
        
        for (let i = 0; i < cities.length; i++) {
            const city = cities[i];
            const country = await con.findOne({ _id: city.country_id }).exec();
            const state = await st.findOne({ _id: city.state_id }).exec();
            
            const country_name = country ? country.country_name : '';
            const state_name = state ? state.state_name : '';

            list.push({
                sno: i + 1,
                city_id: city.city_id,
                city_name:city.city_name,
                state_id: city.state_id,
                state_name: state_name,
                country_id: city.country_id,
                country_name: country_name
            });
        }

        res.json({ city_list: list, error: false });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.city_update = async function (req, res) {
    if (!req.body._id) {
        return res.status(400).json({
            error: 'Missing city id'
        });
    } else {
        try {
            const query = {
                city_id: req.body.city_id,
                city_name: req.body.city_name,
                state_id: req.body.state_id,
                country_id: req.body.country_id
            };

            await cy.findOneAndUpdate({ _id: req.body._id }, query);
            res.json({
                message: "Updated successfully"
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};


exports.city_delete = async function (req, res) {

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