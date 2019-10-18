var express = require('express');
var app = express();
var router = express.Router();
var mysql=require('mysql');

var client=mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'vrbilby',
    port:'3306'
})
router.route('/html/patient')
    .get(function(req,res){
        res.render('html/patient',{title:'Patient'});
    })

router.post('/get_count',function (req,res) {
    select_patient_count = 'select count(*) from \n' +
        '(select    \n' +
        '         vrbilby.Patient.Patient_ID,    \n' +
        '         vrbilby.Patient.Patient_name,    \n' +
        '         vrbilby.patient.Gender,    \n' +
        '         vrbilby.Patient.Age,    \n' +
        '         case when vrbilby.therapy.After_phobiaLV is not null then vrbilby.therapy.After_phobiaLV else vrbilby.patient.PhobiaLV end as Phobia_LV,    \n' +
        '         case when vrbilby.therapy.After_msLV is not null then vrbilby.therapy.After_msLV else vrbilby.patient.MSlv end as MotionSickness_LV,    \n' +
        '         vrbilby.therapy.Therapy_Date      \n' +
        '         from vrbilby.patient      \n' +
        '         left join vrbilby.therapy      \n' +
        '         on vrbilby.patient.Patient_ID = vrbilby.therapy.Patient_ID) t1;'
    client.query(select_patient_count,function (err,results) {
        //console.log(results[0]['count(*)']);
        if (err) throw err;
        res.json(results[0]['count(*)']);

    })

})

router.post('/get_page',function (req,res) {
    var pageNumber = req.body.page;
    var pageStartNum = (pageNumber-1)*5;
    select_patient_page = 'select    \n' +
        '         vrbilby.Patient.Patient_ID,    \n' +
        '         vrbilby.Patient.Patient_name,    \n' +
        '         vrbilby.patient.Gender,    \n' +
        '         vrbilby.Patient.Age,    \n' +
        '         case when vrbilby.therapy.After_phobiaLV is not null then vrbilby.therapy.After_phobiaLV else vrbilby.patient.PhobiaLV end as Phobia_LV,    \n' +
        '         case when vrbilby.therapy.After_msLV is not null then vrbilby.therapy.After_msLV else vrbilby.patient.MSlv end as MotionSickness_LV,    \n' +
        '         vrbilby.therapy.Therapy_Date      \n' +
        '         from vrbilby.patient      \n' +
        '         left join vrbilby.therapy      \n' +
        '         on vrbilby.patient.Patient_ID = vrbilby.therapy.Patient_ID \n' +
        '         order by vrbilby.Patient.Patient_ID \n' +
        '         limit '+pageStartNum+',5 ; '
    client.query(select_patient_page,function (err,results) {
        //console.log(results);
        if (err) throw err;
        res.json(results);

    })

})

router.post('/searchID', function (req,res) {
    var patientSearch = req.body.patient_search
    var select_patientID_sql = 'select  \n' +
        'vrbilby.Patient.Patient_ID,vrbilby.Patient.Patient_name,vrbilby.patient.Gender,vrbilby.Patient.Age,vrbilby.therapy.After_phobiaLV as Phobia_LV,vrbilby.therapy.After_msLV as MotionSickness_LV,vrbilby.therapy.Therapy_Date \n' +
        'from vrbilby.patient \n' +
        'left join vrbilby.therapy \n' +
        'on vrbilby.patient.Patient_ID = vrbilby.therapy.Patient_ID \n' +
        'where vrbilby.patient.Patient_ID = "'+patientSearch+'" or vrbilby.Patient.Patient_Name = "'+patientSearch+'";'
    client.query(select_patientID_sql, function (err, results) {
        if(err) throw err;
        //console.log(results);
        res.json(results);

    })

})


router.post('/maxid', function (req,res) {
    var select_maxid = 'Select vrbilby.patient.Patient_ID from vrbilby.patient order by vrbilby.patient.Patient_ID desc limit 1;'
    client.query(select_maxid,function (err,results) {
        if (err) throw err;
        res.json(results)

    })
})

router.post('/add_new_patient',function (req,res) {
    var patientID = parseInt(req.body.Patient_ID);
    var patientName = req.body.Patient_name
    var patientGender = req.body.Gender;
    var patientAge = req.body.Age;
    var patientEmail = ""
    var patientPhobia_LV = req.body.Phobia_LV;
    var patientMotionSickness_LV = req.body.MotionSickness_LV;
    //console.log(patientID, patientName, patientGender, patientAge,patientEmail, patientPhobia_LV, patientMotionSickness_LV)
    var insert_patient = 'insert into vrbilby.patient (Patient_ID, Patient_Name, Gender, Age, PhobiaLV,MSlv)\n' +
        'values\n' +
        '("'+patientID+'","'+patientName+'","'+patientGender+'","'+patientAge+'","'+patientPhobia_LV+'","'+patientMotionSickness_LV+'");'
    client.query(insert_patient, function (err) {
        if (err) throw err;
        res.json('add successfully');
    })
})

router.post('/setting',function (req,res) {
    var patientID = req.body.Patient_ID;
    var select_setting = 'select vrbilby.therapy.Distance, vrbilby.therapy.Speed, vrbilby.therapy.Spiders \n' +
        'from vrbilby.therapy\n' +
        'where vrbilby.therapy.Patient_ID = "'+patientID+'"\n' +
        'order by vrbilby.therapy.Therapy_Date desc \n' +
        'limit 1;'
    client.query(select_setting,function (err,result) {
        if (err) throw err;
        res.json(result);

    })

})








module.exports = router;