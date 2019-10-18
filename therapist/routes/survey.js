var express = require('express');
var router = express.Router();
var app = express();
//var usr = require('database/databaseConnect');
var mysql=require('mysql');

var client=mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'vrbilby',
    port:'3306'
})

router.route('/html/survey')
    .get(function(req,res){
        res.render('html/survey',{title:'Survey'});
    })

module.exports = router;