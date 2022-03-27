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
    center: [43.7, -79.3],
    zoom: 11,
    layers: [satelliteStreets]
});


// Then we add our 'streets' tile layer to the map.
//streets.addTo(map);
L.control.layers(baseMaps).addTo(map);


// Accessing the Toronto neighborhoods GeoJSON URL.
let torontoHoods = "https://raw.githubusercontent.com/briane2k/MappingEarthquakes_JS_API/main/Mapping_GeoJSON_Polygons/torontoNeighborhoods.json";

// Create a style for the lines.
let myStyle = {
    color: "#ffffa1",
    weight: 2
}

// Grabbing our GeoJSON data.
d3.json(torontoHoods).then(function(data) {
    //console.log(data);
// Creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data)
    .addTo(map);
});
    
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