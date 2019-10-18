var express = require('express');
var router = express.Router();
var app = express();
// create database connect
//var usr = require('database/databaseConnect');
var mysql=require('mysql');

var client=mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'vrbilby',
    port:'3306'
})

// signup page
router.route('/html/signup')
    // get the signup.html
    .get(function(req,res){
        res.render('html/signup',{title:'Register Page'});
    })
    .post(function(req,res) {
        client = usr.connect();
        // use the database method
        var username = req.body.name;
        var password = req.body.pass;
        var type = req.body.type;
        usr.insertFun(client,username ,password, type, function (err) {
            if(err) throw err;
            res.send('success');
        });
    });


module.exports = router;