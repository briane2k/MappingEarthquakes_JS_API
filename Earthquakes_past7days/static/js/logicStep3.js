// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
//light-v10 dark-v10 satellite-streets-v11
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});


// Create a base layer that holds both maps.
let baseMaps = {
    Street: streets,
    Dark: dark,
    Sat: satelliteStreets
};

// Create the map object with a center and zoom level.
//let map = L.map('mapid').setView([30, 30], 2);
let map = L.map("mapid", {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});


// Then we add our 'streets' tile layer to the map.
//streets.addTo(map);
L.control.layers(baseMaps).addTo(map);


// Accessing the Toronto neighborhoods GeoJSON URL.
let days7earthquakes = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// This function determines the color of the circle based on the magnitude of the earthquake.
function getColor(magnitude) {
    if (magnitude > 5) {
        return "#ea2c2c";
    }
    if (magnitude > 4) {
        return "#ea822c";
    }
    if (magnitude > 3) {
        return "#ee9c00";
    }
    if (magnitude > 2) {
        return "#eecc00";
    }
    if (magnitude > 1) {
        return "#d4ee00";
    }
        return "#98ee00";
    }

// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
    if (magnitude === 0) {
        return 1;
    }
        return magnitude * 4;
}

// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius.
function styleInfo(feature) {
    return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.mag),  //"#ffae42",
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
    };
}

// Grabbing our GeoJSON data.
d3.json(days7earthquakes).then(function(data) {
// Creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data, {

        // We turn each feature into a circleMarker on the map.
        pointToLayer: function(feature, latlng) {
            console.log(data);
            return L.circleMarker(latlng);
        },
        style: styleInfo,

        // We create a popup for each circleMarker to display the magnitude and
        //  location of the earthquake after the marker has been created and styled.
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
//            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place + "<br>Time: " + feature.properties.time + "<br>URL: " + feature.properties.url);
        }
    }).addTo(map);
});

//var marker = L.circleMarker([34.0522, -118.2437], {radius: 300, color: "black", fillColor: '#ffffa1'}).addTo(map);



// Grabbing our GeoJSON data.
// d3.json(airportData).then(function(data) {
//     //    console.log(data);
//         // Creating a GeoJSON layer with the retrieved data.
//         L.geoJSON(data, {
//                 onEachFeature: function(feature, layer) {
//                     console.log(feature);
//                     layer.bindPopup("<h2>Airport code: " + feature.properties.faa + "</h2><HR><h3>Airport name: "+feature.properties.name);
//                     //.bindPopup("<h2>Airport code: " + data.properties.faa + "</h2><HR><h3>Airport name: "+data.properties.name)
//                 }
//             }).addTo(map);
//     });





    //eof
    // ,{
    //     style: myStyle,
    //     onEachFeature: function(feature, layer) {
    //         layer.bindPopup("<h3> Airline: "+feature.properties.airline+"</h3><hr><h3>Destination: "+feature.properties.dst+"</h3>");
    //     }
    // }


    // , {
    //     onEachFeature: function(feature, layer) {
    //         console.log(feature);
    //         layer.bindPopup("<h2>Airport code: " + feature.properties.faa + "</h2><HR><h3>Airport name: "+feature.properties.name);
    //         //.bindPopup("<h2>Airport code: " + data.properties.faa + "</h2><HR><h3>Airport name: "+data.properties.name)
    //     }
    // }