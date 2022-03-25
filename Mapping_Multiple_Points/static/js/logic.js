// Add console.log to check to see if our code is working.
console.log("working");

// Get data from cities.js
let cityData = cities;

// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([34.0522, -118.2437], 4);

// Loop through the cities array and create one marker for each city.
cityData.forEach(function(city) {
    console.log(city);
    L.circleMarker(city.location,{
        fillColor: "orange", 
        weight: 4, 
        fillOpacity: 0.30, 
        color: "orange", 
        radius: (city.population-200000)/100000})
    .bindPopup("<h2>"+city.city+", "+city.state+"</h2><hr><h3>Population "+city.population.toLocaleString()+"</h3>")
    .addTo(map);
});
//{location: Array(2), city: 'Phoenix', state: 'AZ', population: 1660272}

// Add a marker to the map for Los Angeles, California.
//var marker = L.marker([34.0522, -118.2437]).addTo(map);
//var marker = L.circle([34.0522, -118.2437], {fillColor: "yellow", fillOpacity: 0.10, color: "black", radius: 300}).addTo(map);
//var marker = L.circleMarker([34.0522, -118.2437], {radius: 300, color: "black", fillColor: '#ffffa1'}).addTo(map);


// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);







//eof