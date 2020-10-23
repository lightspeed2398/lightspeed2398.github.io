//Base Variables
var map;
var attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors amongst others - Design by LS2398';

//Base Layers
var osmurl = 'https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png'; 
var osmbaselayer = L.tileLayer(osmurl, {attribution: attribution, maxZoom: 18}); //Create the Base Layer

var vectorTileOptions= {
	rendererFactory: L.svg.tile,
	interactive: true, 
	maxNativeZoom: 10,
	//tolerance: 10,
	//extent: 128, 
	//buffer: 2,
	vectorTileLayerStyles: {
		mobileq3data: function(properties, zoom) {
			var speed = properties.avg_d_kbps;
			if(speed < 1024){
				return{
					weight: 0,
					fill: true,
					fillOpacity: 0.85,
					fillColor: '#D7191C'
				};
			}
			if(speed > 1024 && speed < 5000){
				return{
					weight: 0,
					fill: true,
					fillOpacity: 0.85,
					fillColor: '#ED6E43'
				};
			}
			if (speed > 5000 && speed < 15000){
				return{
					weight: 0,
					fill: true,
					fillOpacity: 0.85,
					fillColor: '#FEBA6F'
				};
			}
			if (speed > 15000 && speed < 30000){
				return{
					weight: 0,
					fill: true,
					fillOpacity: 0.85,
					fillColor: '#FFE8A5'
				};
			}
			if (speed > 30000 && speed < 60000){
				return{
					weight: 0,
					fill: true,
					fillOpacity: 0.85,
					fillColor: '#E6F5A8'
				};
			}
			if (speed > 60000 && speed < 120000){
				return{
					weight: 0,
					fill: true,
					fillOpacity: 0.85,
					fillColor: '#B3Df76'
				};
			}
			if (speed > 120000 && speed < 240000){
				return{
					weight: 0,
					fill: true,
					fillOpacity: 0.85,
					fillColor: '#6ABD58'
				};
			}
			if (speed > 240000 && speed < 480000){
				return{
					weight: 0,
					fill: true,
					fillOpacity: 0.85,
					fillColor: '#1A9641'
				};
			}
			if (speed > 480000){
				return{
					weight: 0,
					fill: true,
					fillOpacity: 0.85,
					fillColor: '#055B1E'
				};
			}
		}
	}
}


function initialise(){
    map = L.map('map', {minZoom: 5}).setView([52.5, -0.5], 10); //Create & Set View on the Map. 
    map.addLayer(osmbaselayer); //Add the OSM Base Layer. 
    L.vectorGrid.protobuf("https://lightspeed2398.github.io/Ookla/MobileQ3/Tiles/{z}/{x}/{y}.pbf", vectorTileOptions).addTo(map);

}
