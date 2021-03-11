"use strict";
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
    
  // Add google map and GeoJSON data
  
    

  
  
  // Accordion function on accordion div
    
    $("#accordion").accordion({
      
    });
  
    
    // Getter
    var collapsible = $("#accordion").accordion("option", "collapsible");
    var active = $("#accordion").accordion("option", "active");
    
    // Setter
    $("#accordion").accordion("option", "collapsible", true);
    $("#accordion").accordion("option", "active", false);
  
  

    // Get Infection Data
   /* $.getJSON("https://services.arcgis.com/njFNhDsUCentVYJW/arcgis/rest/services/MDCOVID19_CasesPer100KpopulationStatewide/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json", "features:attributes", 
                function(data) {
                    $.get(data.features[-1], function(key, value) {
                        
        
                           $("#current-roi").append(
                            value.Statewide + "<br /> As of: " + value.ReportDate + "<br />");
                            });
                    }, "jsonp");*/
    
                

    $.getJSON("https://services.arcgis.com/njFNhDsUCentVYJW/arcgis/rest/services/MD_Vaccination_Locations/FeatureServer/4/query?where=1%3D1&outFields=*&outSR=4326&f=json",
    "features:attributes", 
        function(data) {
            
            $.each(data.features, function() {
                

                $.each(this, function(key, value) {
               // iterate over json data and pull required records
                var nothingArr = [undefined,"",null];
                
                if (nothingArr.indexOf(value.name) !== -1 && nothingArr.indexOf(value.website_url) !== -1) {
                    
                    } else {
                        $("#vaccine-sites-list").append(
                            "<div class='ui-widget-content'><br />Name: " + value.name + "<br />" +
                            "Address: " + value.fulladdr + "<br />" + "Type: " + value.site_type + "<br />" +
                            "Scheduling Website: <a href='" + value.schedule_url + "' target='_blank'>" + value.schedule_url + "</a><br />"+
                            "Business Website: <a href='" + value.website_url + "' target='_blank'>" + value.website_url + "</a><br /><hr/></div>");
                    }
                            });
                        
                        });
                
 
            }, "jsonp");
          
    // get vaccination totals
    $.getJSON("https://services.arcgis.com/njFNhDsUCentVYJW/arcgis/rest/services/MD_COVID19_TotalVaccinationsStatewideFirstandSecondDose/FeatureServer/0/query?where=1%3D1&outFields=OBJECTID,CumulativeTotalVaccinated,CumulativeTotalVaccinatedDate&outSR=4326&f=json",
    "features:attributes", function(data) {
        let todayTotalArr = data.features;
        var indexPoint = todayTotalArr.length - 1;
        var newData = todayTotalArr[indexPoint];
        let newDataToday = newData.attributes.CumulativeTotalVaccinated;
        $("#current-vacTotal").html(newDataToday.toLocaleString('en-US'));
        

    }, "jsonp");
   
   
    

});
