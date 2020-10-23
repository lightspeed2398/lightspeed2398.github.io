//Base Variables
var map;
var attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors amongst others - <a href="https://github.com/teamookla/ookla-open-data">Ookla</a> under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a>, Edited/Styled by LS2398';
const search = new GeoSearch.GeoSearchControl({
	style: 'button',
	autoClose: true,
	animateZoom: false,
	showMarker: false,
	retainZoomLevel: true,
	provider: new GeoSearch.OpenStreetMapProvider({
		'accept-language': 'en'
	})
});


//Base Layers
var osmurl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'; 
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
			if(speed < 1000){
				return{
					weight: 0,
					fill: true,
					fillOpacity: 0.75,
					fillColor: '#D7191C'
				};
			}
			if(speed > 1000 && speed < 5000){
				return{
					weight: 0,
					fill: true,
					fillOpacity: 0.75,
					fillColor: '#ED6E43'
				};
			}
			if (speed > 5000 && speed < 15000){
				return{
					weight: 0,
					fill: true,
					fillOpacity: 0.75,
					fillColor: '#FEBA6F'
				};
			}
			if (speed > 15000 && speed < 30000){
				return{
					weight: 0,
					fill: true,
					fillOpacity: 0.75,
					fillColor: '#FFE8A5'
				};
			}
			if (speed > 30000 && speed < 60000){
				return{
					weight: 0,
					fill: true,
					fillOpacity: 0.75,
					fillColor: '#E6F5A8'
				};
			}
			if (speed > 60000 && speed < 120000){
				return{
					weight: 0,
					fill: true,
					fillOpacity: 0.75,
					fillColor: '#B3Df76'
				};
			}
			if (speed > 120000 && speed < 240000){
				return{
					weight: 0,
					fill: true,
					fillOpacity: 0.75,
					fillColor: '#6ABD58'
				};
			}
			if (speed > 240000 && speed < 480000){
				return{
					weight: 0,
					fill: true,
					fillOpacity: 0.75,
					fillColor: '#1A9641'
				};
			}
			if (speed > 480000){
				return{
					weight: 0,
					fill: true,
					fillOpacity: 0.75,
					fillColor: '#055B1E'
				};
			}
		}
	}
}


function initialise(){
    map = L.map('map', {minZoom: 5}).setView([52.5, -0.5], 13); //Create & Set View on the Map. 
    map.addLayer(osmbaselayer); //Add the OSM Base Layer. 
	map.addControl(search);
	var OoklaQ3Layer = L.vectorGrid.protobuf("https://lightspeed2398.github.io/Ookla/MobileQ3/Tiles/{z}/{x}/{y}.pbf", vectorTileOptions);
	OoklaQ3Layer.on('click', function(e) {
		var averagedownloadspeed = e.layer.properties.avg_d_kbps/1000;
		var averageuploadspeed = e.layer.properties.avg_u_kbps/1000;
		var averagelatency = e.layer.properties.avg_lat_ms;
		var tests = e.layer.properties.tests;
		var devices = e.layer.properties.devices;
		console.log(e);
		L.popup()
		.setContent("<b>Average Download Speed: </b>" + averagedownloadspeed.toFixed(2) + "Mbps <br> <b> Average Upload Speed: </b>" + averageuploadspeed.toFixed(2) + "Mbps <br> <b> Average Latency: </b>" + averagelatency + "ms <br> <b> Number of Tests: </b>" + tests + "<br> <b> Number of Devices: </b>" + devices) 
		.setLatLng(e.latlng)
		.openOn(map)
	});
	OoklaQ3Layer.addTo(map);

}
