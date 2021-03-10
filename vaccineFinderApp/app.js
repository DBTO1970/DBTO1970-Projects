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
    $.getJSON("https://services.arcgis.com/njFNhDsUCentVYJW/arcgis/rest/services/MDCOVID19_CasesPer100KpopulationStatewide/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json", "features:attributes", 
                function(data) {
                    $.get(data.features[-1], function(key, value) {
                        
        
                           $("#current-roi").append(
                            value.Statewide + "<br /> As of: " + value.ReportDate + "<br />");
                            });
                    }, "jsonp");
    
                
// functions for json vaccination site data
    $.getJSON("https://services.arcgis.com/njFNhDsUCentVYJW/arcgis/rest/services/MD_Vaccination_Locations/FeatureServer/3/query?where=1%3D1&outFields=*&outSR=4326&f=json",
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
                            "Website: <a href='" + value.website_url + "' target='_blank'>" + value.website_url + "</a></div>");
                    }
                            });
                        
                        });
                
 
            }, "jsonp");
          
    // get vaccination totals
    $.getJSON("https://services.arcgis.com/njFNhDsUCentVYJW/arcgis/rest/services/MD_COVID19_TotalVaccinationsStatewideFirstandSecondDose/FeatureServer/0/query?where=1%3D1&outFields=OBJECTID,CumulativeTotalVaccinated,CumulativeTotalVaccinatedDate&outSR=4326&f=json",
    "features:attributes",
        function(data) {
            var totalToday = 0;
            $(data.features, function() {
               
                totalToday = value.CumulativeTotalVaccinated;
            
            });
            $("#current-vacTotal").html(totalToday);
        }, "jsonp");
        
        // ALTERNATIVE functions for json vaccination site data
     /*()   $.getJSON('https://services.arcgis.com/njFNhDsUCentVYJW/arcgis/rest/services/MD_Vaccination_Locations/FeatureServer/3/query?where=1%3D1&outFields=*&outSR=4326&f=json')
        //.then(res => get.JSON())
        .then(data =>
            data.features.filter(({
            attributes
            }) => attributes.name && attributes.website_url)
            .map(({
            attributes
            }) => {
                    return '<div id="vaccine-sites-list">><br />Name: ${attributes.name}<br />Website: <a href="${attributes.website_url}" target="_blank">${attributes.website_url}</a></>';
                }))
        .then(html => console.log(html.join("\n")));*/
        
   
});
