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
// signin page
router.route('/index')
    // get to index.html
    .get(function(req,res){
        res.render('index',{title:'Welcome'});
    })

router.post('/signin',function(req, res) {
    client=usr.connect();
    result=null;
    usr.selectFun(client, req.body.name, function (result) {
        if(result[0]===undefined){
            res.send('username and password does not match');
        }else{
            if(result[0].password==req.body.pass){
                res.json(result);
                //res.json("signin successfully");
            }else{
                res.json('username and password does not match')
            }
        }
    });
});

module.exports = router;