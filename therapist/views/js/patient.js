$(document).ready(function(){
    var maxpage = 1
    $.ajax({
        type: 'POST',
        url: '/get_count',
        dataType: 'json',
        data: '',
        contentType: 'application/x-www-form-urlencoded',
        success: function(data){
            maxpage = data / 5
        }
        ,
        error: function(jqXHR){console.log(jqXHR)},
    })
    var page = 1;
    $.ajax({
        type: 'POST',
        url: '/get_page',
        dataType: 'json',
        data: {
            page:page
        },
        contentType: 'application/x-www-form-urlencoded',
        success: function(data){
            $("#tbody_patient").empty();
            $.each(data,function(index,item){
                $("#tbody_patient").append(
                    "<tr><td>" +   item.Patient_ID   + "</td>"
                    +"<td>" +   item.Patient_name + "</td>"
                    +"<td>" +   item.Age          + "</td>"
                    +"<td>" +   item.Phobia_LV    + "</td>"
                    +"<td>" +   item.MotionSickness_LV + "</td>"
                    + "<td>" +  "<button type='button' class='btn btn-success select_click' value='"+data[0].Patient_ID+"'>Select</button>"
                    + "</td></tr>"
                );
            })
        }
        ,
        error: function(jqXHR){console.log(jqXHR)},
    })

    $(document).on("click", "#previous", function (){
        if(page > 1){
            page = page-1;
        }
        $.ajax({
            type: 'POST',
            url: '/get_page',
            dataType: 'json',
            data: {
                page:page
            },
            contentType: 'application/x-www-form-urlencoded',
            success: function(data){
                $("#tbody_patient").empty();
                $.each(data,function(index,item){
                    $("#tbody_patient").append(
                        "<tr><td>" +   item.Patient_ID   + "</td>"
                        +"<td>" +   item.Patient_name + "</td>"
                        +"<td>" +   item.Age          + "</td>"
                        +"<td>" +   item.Phobia_LV    + "</td>"
                        +"<td>" +   item.MotionSickness_LV + "</td>"
                        + "<td>" +  "<button type='button' class='btn btn-success select_click' value='"+data[0].Patient_ID+"'>Select</button>"
                        + "</td></tr>"
                    );
                })
            }
            ,
            error: function(jqXHR){console.log(jqXHR)},
        })
    })

    $(document).on("click", "#next", function (){
        if (page < maxpage){
            page = page + 1;
        }
        $.ajax({
            type: 'POST',
            url: '/get_page',
            dataType: 'json',
            data: {
                page:page
            },
            contentType: 'application/x-www-form-urlencoded',
            success: function(data){
                $("#tbody_patient").empty();
                $.each(data,function(index,item){
                    $("#tbody_patient").append(
                        "<tr><td>" +   item.Patient_ID   + "</td>"
                        +"<td>" +   item.Patient_name + "</td>"
                        +"<td>" +   item.Age          + "</td>"
                        +"<td>" +   item.Phobia_LV    + "</td>"
                        +"<td>" +   item.MotionSickness_LV + "</td>"
                        + "<td>" +  "<button type='button' class='btn btn-success select_click' value='"+data[0].Patient_ID+"'>Select</button>"
                        + "</td></tr>"
                    );
                })
            }
            ,
            error: function(jqXHR){console.log(jqXHR)},
        })
    })

    $(document).on("click", "#searchid", function (){
        $.ajax({
            type: 'POST',
            url: '/searchID',
            dataType: 'json',
            data:{patient_search:$("#patientid").val()},
            contentType: 'application/x-www-form-urlencoded',
            success: function(data){
                $("#tbody_patient").empty();
                $("#tbody_patient").append(
                    "<tr><td>" +   data[0].Patient_ID   + "</td>"
                    +"<td>" +   data[0].Patient_name + "</td>"
                    +"<td>" +   data[0].Age          + "</td>"
                    +"<td>" +   data[0].Phobia_LV    + "</td>"
                    +"<td>" +   data[0].MotionSickness_LV + "</td>"
                    + "<td>" +  "<button type='button' class='btn btn-success select_click' value='"+data[0].Patient_ID+"'>Select</button>"
                    + "</td></tr>"
                )
            }
            ,
            error: function(jqXHR){console.log(jqXHR)},
        })
    })
    var max_id

    $(document).on("click", "#addnewpatientlist", function (){
        $.ajax({
            type: 'POST',
            url: '/maxid',
            dataType: 'json',
            data:'',
            contentType: 'application/x-www-form-urlencoded',
            success: function(data){
                max_id = data[0].Patient_ID + 1
                $("#Patient_ID").val(max_id)
            }
            ,
            error: function(jqXHR){console.log(jqXHR)},
        })
    })

    $(document).on("click", "#button_add", function (){
        $.ajax({
            type: 'POST',
            url: '/add_new_patient',
            dataType: 'json',
            data:{
                Patient_ID: $("#Patient_ID").val(),
                Patient_name: $("#Patient_name").val(),
                Gender: $("#gender").val(),
                Age: $("#age").val(),
                Phobia_LV: $("#Phobia_Level").val(),
                MotionSickness_LV: $("#Motionsickness_Level").val()
            },
            contentType: 'application/x-www-form-urlencoded',
            success: function(data){
                alert("Add successfully");
                window.location.reload()
            }
            ,
            error: function(jqXHR){console.log(jqXHR)},
        })
    })

    $(document).on("click", ".select_click", function (){
        var patient_id = $(this).val()
        $.ajax({
            type: 'POST',
            url: '/setting',
            dataType: 'json',
            data:{
                Patient_ID: patient_id,
            },
            success: function(data){
                if(data.length == 0){
                    localStorage.Distance = 5;
                    localStorage.Speed = 1;
                    localStorage.Spiders = 1;
                    window.location.href = "/html/setting";
                }
                else {

                    localStorage.Distance = data[0].Distance;
                    localStorage.Speed = data[0].Speed;
                    localStorage.Spiders = data[0].Spiders;
                    window.location.href = "/html/setting";
                }
            }
            ,
            error: function(jqXHR){console.log(jqXHR)},
        })

    })



})
