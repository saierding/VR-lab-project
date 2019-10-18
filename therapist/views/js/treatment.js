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
        value: 5,
        min: 0,
        max: 10,
        slide: function( event, ui ) {
            $( "#distance" ).val( ui.value );
        }
    });
    $( "#distance" ).val( $( "#slider-range-distance" ).slider( "value" ) );


    $( "#slider-range-speed").slider({
        range: "min",
        value: 3,
        min: 1,
        max: 5,
        slide: function( event, ui ) {
            $( "#speed" ).val( ui.value );
        }
    });
    $( "#speed" ).val( $( "#slider-range-speed" ).slider( "value" ) );

    $( "#slider-range-spiders" ).slider({
        range: "min",
        value: 4,
        min: 1,
        max: 6,
        slide: function( event, ui ) {
            $( "#spiders" ).val( ui.value );
        }
    });
    $( "#spiders" ).val( $( "#slider-range-spiders" ).slider( "value" ) );
})
