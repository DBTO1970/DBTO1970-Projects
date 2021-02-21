$(document).ready(function(){
    // Get current date and time for #date-time
    var today = new Date();
    var month = today.getMonth();
    if (month == 0) {
        month = "January";
    } else if (month == 1) {
        month = "February";
    } else if (month == 2) {
        month = "March";
    } else if (month == 3) {
        month = "April";
    } else if (month == 4) {
        month = "May";
    } else if (month == 5) {
        month = "June";
    } else if (month == 6) {
        month = "July";
    } else if (month == 7) {
        month = "August";
    } else if (month == 8) {
        month = "September";
    } else if (month == 9) {
        month = "October";
    } else if (month == 10) {
        month = "November";
    } else if (month == 11) {
        month = "December";
    } // to get Month in string format
    
    var date = month + ' ' + today.getDate() + ', ' + today.getFullYear();
        
    $("#date-time").html(date);

  // Get current location


    // functions for json data

    function setUp() {
        getJSON("https://services.arcgis.com/njFNhDsUCentVYJW/arcgis/rest/services/MDCOVID19_CasesPer100KpopulationStatewide/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json", gotData, 'jsonp');

    }

    function gotData(data){
        var infRate = 0.0;
        infRate = data.features[0].attributes.Statewide;
        $("#current-roi").html(infRate);

    }


    // function to show/hide disclaimer
    $("#disclaimer").hide();
    function hideDisclaimer() {
        $("#disclaimer").hide();
    }
    
    $("#disclaimer-button").click(function() {
        $('#disclaimer').show();
        }, hideDisclaimer());   
}); // end ready function