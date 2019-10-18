/*
This JS file is for the setting page, which realize the function of the slider bar and the preset settings for different patients
 */

$(document).ready(function(){
        $( "#slider-range-duration" ).slider({
            range: "min",
            value: 10,
            min: 5,
            max: 60,
            slide: function( event, ui ) {
                $( "#duration" ).val( ui.value );
            }
        });
        $( "#duration" ).val( $( "#slider-range-duration" ).slider( "value" ) );

        $( "#slider-range-distance" ).slider({
            range: "min",
            value: localStorage.Distance,
            min: 0,
            max: 10,
            slide: function( event, ui ) {
                $( "#distance" ).val( ui.value );
            }
        });
        $( "#distance" ).val( $( "#slider-range-distance" ).slider( "value" ) );


        $( "#slider-range-speed").slider({
            range: "min",
            value: localStorage.Speed,
            min: 1,
            max: 5,
            slide: function( event, ui ) {
                $( "#speed" ).val( ui.value );
            }
        });
        $( "#speed" ).val( $( "#slider-range-speed" ).slider( "value" ) );

        $( "#slider-range-spiders" ).slider({
            range: "min",
            value: localStorage.Spiders,
            min: 1,
            max: 6,
            slide: function( event, ui ) {
                $( "#spiders" ).val( ui.value );
            }
        });
        $( "#spiders" ).val( $( "#slider-range-spiders" ).slider( "value" ) );

    $(function () {
        $(document).on("click", ".save_parameters", function (){
            if ($("#motion_sickness_select").val()=="Low" && $("#phobix_select").val()=="Low"){

                $( "#slider-range-duration" ).slider({
                    value:50
                })
                $( "#duration" ).val( "50" );

                $( "#slider-range-distance" ).slider({
                    value:3
                })
                $( "#distance" ).val( "3" );

                $( "#slider-range-speed" ).slider({
                    value:3
                })
                $( "#speed" ).val( "3" );

                $( "#slider-range-spiders" ).slider({
                    value:5
                })
                $( "#spiders" ).val( "5" );

            }

            if ($("#motion_sickness_select").val()=="High" && $("#phobix_select").val()=="Low"){

                $( "#slider-range-duration" ).slider({
                    value:10
                })
                $( "#duration" ).val( "10" );

                $( "#slider-range-distance" ).slider({
                    value:4
                })
                $( "#distance" ).val( "4" );

                $( "#slider-range-speed" ).slider({
                    value:2
                })
                $( "#speed" ).val( "2" );

                $( "#slider-range-spiders" ).slider({
                    value:2
                })
                $( "#spiders" ).val( "2" );

            }
        })
    })






})
