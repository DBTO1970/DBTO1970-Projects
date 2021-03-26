    let map;
    let infoWindow;
    function initMap() {
        var options = {
            center: {lat: 39.0458, lng: -76.6413},
            zoom: 8,
            
        };
        
        map = new google.maps.Map(document.getElementById('map'), options);
        infoWindow = new google.maps.InfoWindow;
        //console.log(script);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(p){
                var position = {
                    lat: p.coords.latitude,
                    lng: p.coords.longitude
                };
                infoWindow.setPosition(position);
                infoWindow.setContent('Current Location');
                infoWindow.open(map);

            }, function() {
                handleLocationError('Geolocation service failed');
            })

        } else {
            handleLocationError('No Geolocation Available');

        }
        function handleLocationError (content, position) {
            infoWindow.setPosition(position);
            infoWindow.setContent(content);
            infoWindow.open(map);
        }
        initMap2();
    }; // end initMap function
    // Create script tag and set site data as source

    const script = document.createElement('script');
    script.src = ('https://opendata.arcgis.com/datasets/d677f143334648a1a40b84d94df8e134_4.geojson');
    document.getElementsByTagName('head') [0].appendChild(script);

    // Loop through results array from vaccine site GeoJson and place marker for each set of coords
    
    $.getJSON("https://opendata.arcgis.com/datasets/d677f143334648a1a40b84d94df8e134_4.geojson",
    function(results) {
        for (let i = 0; i < results.features.length; i++) {
            const coords = results.features[i].geometry.coordinates;
            const latLng = new google.maps.LatLng(coords[1], coords[0]);
            const markerInfo = results.features[i].attributes;
            new google.maps.Marker({
                position: latLng,
                map: map,
                infoWindow: infoWindow,
                marker: markerInfo,
                
            });
        }
    }, "jsonp");

    let map2;
    let infoWindow2;
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
                infoWindow2.setContent('Current Location');
                infoWindow2.open(map2);

            }, function() {
                handleLocationError2('Geolocation service failed');
            })

        } else {
            handleLocationError2('No Geolocation Available');

        }
        function handleLocationError2 (content, position) {
            infoWindow2.setPosition(position);
            infoWindow2.setContent(content);
            infoWindow2.open(map2);
        }
        
    }; // end initMap2 function

    // Get GeoJSON data for vaccinations administered and cases
    
    $.getJSON("https://opendata.arcgis.com/datasets/04d60ba645b34c3b92eae5d6fa70b69b_0.geojson",
    function(results) {
        for (let i = 0; i < results.features.length; i++) {
            
            
            
            new google.maps.Marker({
                
                map: map2,
                infoWindow: infoWindow2,
                
                
            });
        }
    }, "jsonp");

  