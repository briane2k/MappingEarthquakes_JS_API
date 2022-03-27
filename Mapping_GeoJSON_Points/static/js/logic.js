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


// Create a base layer that holds both maps.
let baseMaps = {
    Street: streets,
    Dark: dark
};

// Create the map object with a center and zoom level.
//let map = L.map('mapid').setView([30, 30], 2);
let map = L.map("mapid", {
    center: [30, 30],
    zoom: 2,
    layers: [streets]
});


// Then we add our 'streets' tile layer to the map.
//streets.addTo(map);
L.control.layers(baseMaps).addTo(map);


// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/briane2k/MappingEarthquakes_JS_API/main/Mapping_Earthquakes/majorAirports.json";

// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
    //    console.log(data);
        // Creating a GeoJSON layer with the retrieved data.
        L.geoJSON(data, {
                onEachFeature: function(feature, layer) {
                    console.log(feature);
                    layer.bindPopup("<h2>Airport code: " + feature.properties.faa + "</h2><HR><h3>Airport name: "+feature.properties.name);
                    //.bindPopup("<h2>Airport code: " + data.properties.faa + "</h2><HR><h3>Airport name: "+data.properties.name)
                }
            }).addTo(map);
    });
    //.bindPopup("<h2>Airport code: " + feature.properties.faa + "</h2><HR><h3>Airport name: "+feature.properties.name)
    
    //eof