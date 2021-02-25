$(document).ready(function(){
    
     // function to show/hide disclaimer
     
     $( function() {
       $( "#dialog" ).dialog({
         autoOpen: false,
         show: {
           effect: "blind",
           duration: 1000
         },
         hide: {
           effect: "blind",
           duration: 1000
         }
       });
    
       $( "#opener" ).on( "click", function() {
         $( "#dialog" ).dialog( "open" );
       });
     } );
     
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
    
  // Get current location FROM GOOGLE
  let map;

  function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 2,
      center: new google.maps.LatLng(2.8, -187.3),
      mapTypeId: "terrain",
    });
    // Create a <script> tag and set the USGS URL as the source.
    const script = document.createElement("script");
    // This example uses a local copy of the GeoJSON stored at
    // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
    script.src =
      "https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js";
    document.getElementsByTagName("head")[0].appendChild(script);
  }
  
  // Loop through the results array and place a marker for each
  // set of coordinates.
  const eqfeed_callback = function (results) {
    for (let i = 0; i < results.features.length; i++) {
      const coords = results.features[i].geometry.coordinates;
      const latLng = new google.maps.LatLng(coords[1], coords[0]);
      new google.maps.Marker({
        position: latLng,
        map: map,
      });
    }
  };
    // Get Infection Data
    $.getJSON("https://services.arcgis.com/njFNhDsUCentVYJW/arcgis/rest/services/MDCOVID19_CasesPer100KpopulationStatewide/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json",
            "features:attributes", 
                function(data) {
                    $.get(data.features[-1], function(key, value) {
                        
        
                           $("#current-roi").append(
                            value.Statewide + "<br /> As of: " + value.ReportDate + "<br />");
                            });
        
                           
                    
                    }, "jsonp");

                    });

    // functions for json vaccination site data
    $.getJSON("https://services.arcgis.com/njFNhDsUCentVYJW/arcgis/rest/services/MD_Vaccination_Locations/FeatureServer/3/query?where=1%3D1&outFields=*&outSR=4326&f=json",
    "features:attributes", 
        function(data) {
            $.each(data.features, function() {

                $.each(this, function(key, value) {
               
                $("#current-sites").append(
                        "<div class='ui-widget-content'><br />Name: " + value.name + "<br />" +
                        "Website: <a href='" + value.website_url + "' target='_blank'>" + value.website_url + "</a></div>");
                    
                });
            
 
            }, "jsonp");
            
   
}); // end ready function