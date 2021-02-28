    var map;
    var infoWindow;
    function initMap() {
        var options = {
            center: {lat: 39.0458, lng: -76.6413},
            zoom: 10,
            
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
        var searchBox;

        var input = document.getElementById('search');
        var searchBox = new google.maps.places.searchBox(input);

        map.addListenter('bounds_changed', function() {
            searchBox.setBounds(mapt.getBounds());
        });

        var markers = [];

        searchBox.addListenter('places_changed', function() {
            var places = searchBox.getPlaces();

            if (places.length === 0) 
                return;
            markers.forEach(function(m) { m.setMap(null); });
            markers = [];

            var bounds = new google.maps.LatLngBounds();

            places.forEach(function (p) {
                if (!p.geometry)
                    return;
                markers.push(new google.maps.Marker({
                    map: map,
                    title: p.name,
                    position: p.geometry.location
                }));

                if (p.geometyr.viewport)
                    bounds.union(p.geometry.viewport);
                else
                    bounds.extend(p.geometry.location);

            });
            map.fitBounds(bounds);
        });
    } // end initMap function

    

   


 
    //let sitesLayer = map.data.loadGeoJson('https://opendata.arcgis.com/datasets/d677f143334648a1a40b84d94df8e134_4.geojson', initMap, 'jsonp');
