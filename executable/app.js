 // Map initialization 

    var map = L.map('map').setView([51.505, -0.09], 13);

    //osm layer

    var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    osm.addTo(map);

// asking for current position

    if(!navigator.geolocation) {
        console.log("Your browser doesn't support geolocation feature!")
    } else {
            navigator.geolocation.getCurrentPosition(getPosition);
    }

    var marker, circle;

// the actualt getPosition function that works through geolocation API and checks for my coordonations

    function getPosition(position){
        // console.log(position)
        var lat = position.coords.latitude
        var long = position.coords.longitude
        var accuracy = position.coords.accuracy

        if(marker) {
            map.removeLayer(marker)
        }

        if(circle) {
            map.removeLayer(circle)
        }

        //makes the blue marker to see where i am and the circle that shows the accuracy of my locaiton

        marker = L.marker([lat, long])
        circle = L.circle([lat, long], {radius: accuracy})

        //here is created the feature group - a container for multiple layers in our case the marker and the circle 
        // we simply add them to our current map thorug map.add function

        var featureGroup = L.featureGroup([marker, circle]).addTo(map)

        // this line adjusts the map's view to contain the boundaries of the featureGroup
        // if commented this line the marker and circle will show my location but the map will not redirect me to my location
        map.fitBounds(featureGroup.getBounds())

        console.log("Your coordinate is: Lat: "+ lat +" Long: "+ long+ " Accuracy: "+ accuracy)
    }

