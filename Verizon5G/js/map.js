//Base Variables
var map;
var attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors amongst others - Design by LS2398';
var layercontrol;


//Base Layers
var osmurl = 'https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png'; 
var osmbaselayer = L.tileLayer(osmurl, {attribution: attribution, maxZoom: 18}); //Create the Base Layer

//Coverage Layers

var opacity = 0.8;


//Verizon5GLayer

var vzw5g_url = 'https://gismaps.verizon.com/MapUI/proxy/proxy.ashx?https://nppmaps-east1.vpc.verizon.com/Coverage/Internal/5G/Roads/tile/{z}/{y}/{x}';
vzw_5g = new L.tileLayer (vzw5g_url, {tms: false, opacity: opacity});


function initialise(){
    map = L.map('map').setView([39.0, -101], 6); //Create & Set View on the Map. 
    map.addLayer(osmbaselayer); //Add the OSM Base Layer. 
    map.addLayer(vzw_5g);
}
