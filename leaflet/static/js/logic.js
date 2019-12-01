// Create map element. Center view on continential U.S. Set default zoom to level 5.
var myMap = L.map('map').setView([39.8283, -98.5795], 5);

// Set tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 10,
    minZoom: 5,
    // Set to lock zoom to U.S.
    // id: "mapbox.streets"
    // id: "mapbox.pirates",
    accessToken: API_KEY
}).addTo(myMap);


// Define functions for formatting number strings.
var formatDecimalComma = d3.format(",.2f");
var formatComma = d3.format(",");
var formatMoney = function(d) { return "$" + formatComma(d); };

(async function(){
    const realEstateData = await d3.csv("../../income_dataset/real_estate_db.csv");
    // Create marker cluster.
    const markers = L.markerClusterGroup();
    
    realEstateData.forEach(data => {
        // const location = data.location;
        // if (location){
        // const coord = [location.coordinates[1], location.coordinates[0]]
        const coord = [data.lat, data.lng]
        // const zipCode = data.zip_code
        const mortgage_median = formatMoney(data.hc_mortgage_median)
        // markers.addLayer(L.marker(coord).bindPopup(zipCode))
        markers.addLayer(L.marker(coord).bindPopup("The median mortgage for this zip code is: " + mortgage_median))
        // }
    })
    // Add our marker cluster layer to the map
    myMap.addLayer(markers);

})()

// L.control.layers(markers, {
//     collapsed: false
// }).addTo(myMap);