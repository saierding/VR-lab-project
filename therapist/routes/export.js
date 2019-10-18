var express = require('express');
var app = express();
var router = express.Router();
var mysql=require('mysql');
var patient = require('patient_list');


var client=mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'vrbilby',
    port:'3306'
})
var pageStartNum = 0;
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
    var array = [];
    var patientID =[];
    var patientname = [];
    var k;
    array.push(results);
    var arrays = array[0]
    var i = arrays.length
    for ( k=0; k<i; k++){
        patientID.push(arrays[k]['Patient_ID'])
        patientname.push(arrays[k]['Patient_name'])
    }
    console.log(patientID,patientname);

    if (err) throw err;
})


