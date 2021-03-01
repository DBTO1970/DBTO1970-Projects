    var map;
    var infoWindow;
    function initMap() {
        var options = {
            center: {lat: 39.0458, lng: -76.6413},
            zoom: 8,
            
        };

        map = new google.maps.Map(document.getElementById('map'), options);
        infoWindow = new google.maps.InfoWindow;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(p){
                var position = {
                    lat: p.coords.latitude,
                    lng: p.coords.longitude
                };
                infoWindow.setPosition(position);
                infoWindow.setContent('Your Location!');
                infoWindow.open(map);

            }, function() {
                handleLocationError('Geolocation service failed', map.center());
            })

        } else {
            handleLocationError('No Geolocation Available', map.center());

        }
        function handleLocationError (content, position) {
            infoWindow.setPosition(position);
            infoWindow.setContent(content);
            infoWindow.open(map);
        }
        initMap2();
    } // end initMap function

    var map2;
    var infoWindow2;
    function initMap2() {
        var options = {
            center: {lat: 39.0458, lng: -76.6413},
            zoom: 8,
            
        };

        map2 = new google.maps.Map(document.getElementById('map2'), options);
        infoWindow2 = new google.maps.InfoWindow;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(p){
                var position = {
                    lat: p.coords.latitude,
                    lng: p.coords.longitude
                };
                infoWindow2.setPosition(position);
                infoWindow2.setContent('Your Location!');
                infoWindow2.open(map2);

            }, function() {
                handleLocationError('Geolocation service failed', map2.center());
            })

        } else {
            handleLocationError('No Geolocation Available', map2.center());

        }
        function handleLocationError (content, position) {
            infoWindow2.setPosition(position);
            infoWindow2.setContent(content);
            infoWindow2.open(map2);
        }
        
    } // end initMap2 function

    

   


 
    //let sitesLayer = map.data.loadGeoJson('https://opendata.arcgis.com/datasets/d677f143334648a1a40b84d94df8e134_4.geojson', initMap, 'jsonp');
