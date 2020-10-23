//Base Variables
var map;
var attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors amongst others - Design by LS2398';

//Base Layers
var osmurl = 'https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png'; 
var osmbaselayer = L.tileLayer(osmurl, {attribution: attribution, maxZoom: 18}); //Create the Base Layer

var vectorTileOptions= {
	interactive: true, 
	maxNativeZoom: 7, 
	vectorTileLayerStyles: {
		mobileq3data: function(properties, zoom) {
			var speed = properties.avg_d_kbps;
			if(speed < 100000){
				return{
					color: '#FF0000'
				}
			if(speed > 100000)}
				return{
					color: '#00FF00'
				}
		}
	}
}


function initialise(){
    map = L.map('map', {minZoom: 10}).setView([52.5, -0.5], 10); //Create & Set View on the Map. 
    map.addLayer(osmbaselayer); //Add the OSM Base Layer. 
    L.vectorGrid.protobuf("https://lightspeed2398.github.io/Ookla/MobileQ3/Tiles/{z}/{x}/{y}.pbf", vectorTileOptions).addTo(map);

}

