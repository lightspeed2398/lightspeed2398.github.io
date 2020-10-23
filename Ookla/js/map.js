//Base Variables
var map;
var attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors amongst others - Design by LS2398';
var layercontrol;


//Base Layers
var osmurl = 'https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png'; 
var osmbaselayer = L.tileLayer(osmurl, {attribution: attribution, maxZoom: 18}); //Create the Base Layer

function initialise(){
    map = L.map('map').setView([52.5, -0.5], 6); //Create & Set View on the Map. 
    map.addLayer(osmbaselayer); //Add the OSM Base Layer. 
    L.vectorGrid.protobuf("https://lightspeed2398.github.io/Ookla/MobileQ3/Tiles/{z}/{x}/{y}.pbf").addTo(map);

}

