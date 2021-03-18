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
    // see maps.js
 //
 
  // Accordion function on accordion div
    
    $("#accordion").accordion({
      
    });
    $("#accordionData").accordion({
      
    });
  
    
    // Getter
    var collapsible = $("#accordion").accordion("option", "collapsible");
    var active = $("#accordion").accordion("option", "active");
    
    // Setter
    $("#accordionData").accordion("option", "collapsible", true);
    $("#accordionData").accordion("option", "active", false);

     // Getter
     var collapsible = $("#accordionData").accordion("option", "collapsible");
     var active = $("#accordionData").accordion("option", "active");
     
     // Setter
     $("#accordion").accordion("option", "collapsible", true);
     $("#accordion").accordion("option", "active", false);

// Vaccine Site Data
    $.getJSON("https://opendata.arcgis.com/datasets/d677f143334648a1a40b84d94df8e134_4.geojson",
    "features:", 
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
                            "Main Website: <a href='" + value.website_url + "' target='_blank'>" + value.website_url + "</a><br /><hr/></div>");
                            
                        } 
                       
                    
                            

                            });
                        
                        });

                        
                        
            }, "jsonp");
          
    // get vaccination totals
    $.getJSON("https://services.arcgis.com/njFNhDsUCentVYJW/arcgis/rest/services/MD_COVID19_TotalVaccinationsStatewideFirstandSecondDose/FeatureServer/0/query?where=1%3D1&outFields=OBJECTID,CumulativeTotalVaccinated,CumulativeTotalVaccinatedDate&outSR=4326&f=json",
    "features:attributes", function(data) {
        let todayTotalArr = data.features;
        let indexPoint = todayTotalArr.length - 1;
        let prevIndexPoint = todayTotalArr.length - 2;
        let prevData = todayTotalArr[prevIndexPoint];
        let newData = todayTotalArr[indexPoint];
        let newDataToday = newData.attributes.CumulativeTotalVaccinated;
        let prevDataToday = prevData.attributes.CumulativeTotalVaccinated;
        
        if (prevDataToday < newDataToday) {
            $('#current-vacTotal').addClass('increase');


        } else if (prevDataToday > newDataToday) {
            $('#current-vacTotal').addClass('decrease');

        } else {
            $('#current-vacTotal').addClass('stable');
        }
        let percentVax = (newDataToday / 6060000) * 100;
        $("#current-vacTotal").html(newDataToday.toLocaleString('en-US') + "  (" + percentVax.toLocaleString('en-US') + "%)");
        

    }, "jsonp");
   
    // Get infection totals
    $.getJSON("https://services.arcgis.com/njFNhDsUCentVYJW/arcgis/rest/services/MDCOVID19_CasesPer100KpopulationStatewide/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json",
    "features:attributes", function(data) {
        let todayTotalCasesArr = data.features;
        let indexPointCases = todayTotalCasesArr.length - 1;
        let prevIndexPointCases = todayTotalCasesArr.length -2;
        let newCasesData = todayTotalCasesArr[indexPointCases];
        let prevNewCasesData = todayTotalCasesArr[prevIndexPointCases];
        let newCasesDataToday = (newCasesData.attributes.Statewide);
        let prevCasesToday = (prevNewCasesData.attributes.Statewide);
        //let infectionRate = (newCasesDataToday / 6060000) * 100;
        if (prevCasesToday < newCasesDataToday) {
            $('#current-caseTotal').addClass('infInc');


        } else if (prevCasesToday > newCasesDataToday) {
            $('#current-caseTotal').addClass('infDec');

        } else {
            $('#current-caseTotal').addClass('infStable');
        }
        $("#current-caseTotal").html(newCasesDataToday.toLocaleString('en-US'));
    }, "jsonp");
   
    

});
