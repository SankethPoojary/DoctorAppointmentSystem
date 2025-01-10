'use strict';
const e = require('express');
// var sha1 = require('sha1');
var randtoken = require('rand-token');
var mongoose = require('mongoose'),
    reg = mongoose.model('registration');
var moment = require('moment');
var imag=mongoose.model('image');


exports.add_user = function (req, res) {
    reg.find({ $or: [{ user_email: req.body.email }, { user_name: req.body.username }] }, function (err, num) {
        if (err) {
            res.status(500).json({ error: true, msg: 'Internal server error' });
            return;
        }

        if (num.length >= 1) {
            var emailExists = num.some(user => user.user_email === req.body.email);
            var usernameExists = num.some(user => user.user_name === req.body.username);
            if (emailExists && usernameExists) {
                res.json({ msg: 'Email and username already exist!', error: true });
            } else if (emailExists) {
                res.json({ msg: 'Email already exists!', error: true });
            } else if (usernameExists) {
                res.json({ msg: 'Username already exists!', error: true });
            }
        } else {
            var body = req.body;
            console.log(body);
            var new_reg = new reg({
                user_name: body.username,
                user_email: body.email,
                user_password: body.password,
                created_date: moment().utcOffset("+05:30").format("DD MMM, YYYY hh:mm a")
            });

            new_reg.save(function (err, task) {
                if (err) {
                    res.status(500).json({ error: true, msg: 'Failed to save user' });
                } else {
                    res.json(task);
                }
            });
        }
    });
}

exports.login = function (req, res) {
    reg.find({ $and: [{ user_name: req.body.username}, { user_password: req.body.password }] }, function (err, users) {
        if (err) {
            console.error('Error in login query:', err);
            return res.status(500).json({ msg: 'Internal server error', error: true });
        }

        if (users && users.length >= 1) {
            const loggedInUserId = users[0]._id; 
            res.json({  userId: loggedInUserId, error: false });
        } else {
            res.json({ msg: 'Username or password is wrong', error: true });
        }
    });
}



exports.image_add = function (req, res) {
   
    var body = req.body;
    var employee_image="";
if (req.file) {
employee_image = process.env.IMAGE_URL + "employeeimage/" + req.file.filename
}
    console.log(body);
    var imag_save= new imag({
        img_title: body.img_title,
        img_path: employee_image
    });
console.log(imag_save);
    imag_save.save(function (err, task) {
        if (err) {
            res.status(500).json({ error: true, msg: 'Failed to save user' });
        } else {
            res.json(task);
        }
    });
}

        exports.edit_image = function (req, res) {
            var body = req.body;
            var employee_image = "";
            
            if (req.file) {
                employee_image = process.env.IMAGE_URL + "employeeimage/" + req.file.filename;
            }
            
            console.log(body);
        
            if (body._id) {
               
                imag.findById(body._id, function (err, existingImage) {
                     {
                        if (existingImage) {
                            existingImage.img_title = body.img_title;
                            existingImage.img_path = employee_image;
        
                            existingImage.save(function (err, updatedImage) {
                                if (err) {
                                    res.status(500).json({ error: true, msg: 'Failed to update image' });
                                } else {
                                    res.json(updatedImage);
                                }
                            });
                        } else {
                            res.status(404).json({ error: true, msg: 'Image not found' });
                        }
                    }
                });
            } 
        };

        exports.image_list = function (req, res) {
            var list = []
            imag.find({ deleted_status: false }, function (err, resp) {
              if (err) {
                return res.status(400).json({
                  error: err
                });
              } else {
                for (var i = 0; i < resp.length; i++) {
                  list.push({
                    sno: i + 1,
                    _id: resp[i]._id,
                    img_title: resp[i].img_title,
                    img_path: resp[i].img_path
                   
                  })
                }
                res.json({ image_list: list, error: false });
              }
            });
        }

        exports.img_list_by_id = function (req, res) {
            console.log("api called");
            console.log("id==",req.body._id);
            var list = []
            imag.find({ _id: req.body._id}, function (err, resp) {
              if (err) {
                return res.status(400).json({
                  error: err
                });
              } else {
                for (var i = 0; i < resp.length; i++) {
                  list.push({
                    sno: i + 1,
                    _id: resp[i]._id,
                    img_title: resp[i].img_title,
                    img_path: resp[i].img_path
                  })
                }
                res.json({ image_list: list, error: false });
              }
            });
          
          
          };

          exports.img_update= async function (req, res) {

            if (!req.body._id) {
              return res.status(400).json({
                error: 'Missing imgage id'
              });
            } else {
                var body = req.body;
                var employee_image="";
        if (req.file) {
            employee_image = process.env.IMAGE_URL + "employeeimage/" + req.file.filename
        }
                console.log(body);
                var query=({
                    img_title: body.img_title,
                    img_path: employee_image
                   
                });
    
              await imag.findOneAndUpdate({ _id: req.body._id },query);
              res.json({
                message: "Updated successfully"
              });
            
            } 
        }
        