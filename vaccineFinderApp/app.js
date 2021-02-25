$(document).ready(function(){
    
     // function to show/hide disclaimer
    
    // function makeDate() Get current date and time for #date-time
    
    function makeDate(Date) {
        
        var month = Date.getMonth();
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
        
        var date = month + ' ' + Date.getDate() + ', ' + Date.getFullYear();
            
        $("#date-time").html(date);
    }
    var today = new Date();
    makeDate(today);
    
  // Get current location

    // Get Infection Data
    $.getJSON("https://services.arcgis.com/njFNhDsUCentVYJW/arcgis/rest/services/MDCOVID19_CasesPer100KpopulationStatewide/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json",
            "features:attributes", 
                function(data) {
                    $.get(data.features[-1], function(key, value) {
        
                           $("#current-roi").append(
                            value.Statewide + "<br />");
                            });
        
                           
                    
                    }, "jsonp");
                    
                    
                    /*var infRate = 0.0;
                    infRate = data.per_100k;
                    $("#current-roi").html(infRate);*/
        
                
        
                    });

    // functions for json data
    $.getJSON("https://services.arcgis.com/njFNhDsUCentVYJW/arcgis/rest/services/MD_Vaccination_Locations/FeatureServer/3/query?where=1%3D1&outFields=*&outSR=4326&f=json",
    "features:attributes", 
        function(data) {
            $.each(data.features, function() {

                $.each(this, function(key, value) {
               
                $("#current-sites").append(
                        "<br /><div class='ui-widget-content'><br />Name: " + value.name + "<br />" +
                        "Website: <a href='" + value.website_url + "' target='_blank'>" + value.website_url + "</a></div>");
                    
                });
 
            }, "jsonp");
            
   
});