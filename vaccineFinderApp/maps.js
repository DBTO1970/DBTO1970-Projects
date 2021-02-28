$(document).ready(function(){
    
    var map;
    function initMap() {
        var options = {
            center: {lat: 39.0458, lng: -76.6413},
            zoom: 10
        };

        map = new google.maps.Map(document.getElementById('map'), options);
    }


 
    //let sitesLayer = map.data.loadGeoJson('https://opendata.arcgis.com/datasets/d677f143334648a1a40b84d94df8e134_4.geojson', initMap, 'jsonp');



}); // end ready function
