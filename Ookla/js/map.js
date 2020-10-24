//Base Variables
var map;
var attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors amongst others - <a href="https://github.com/teamookla/ookla-open-data">Ookla</a> under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a>, Edited/Styled by LS2398';
const search = new GeoSearch.GeoSearchControl({
	style: 'button',
	autoClose: true,
	showMarker: false,
	retainZoomLevel: true,
	provider: new GeoSearch.OpenStreetMapProvider({
		'accept-language': 'en'
	})
});

var colourSpeedRanges = [
	{
		min: 0,
		max: 1,
		colour: '#D7191C'
	},
	{
		min: 1,
		max: 5,
		colour: '#ED6E43'
	},
	{
		min: 5,
		max: 15,
		colour: '#FEBA6F'
	},
	{
		min: 15,
		max: 30,
		colour: '#FFE8A5'
	},
	{
		min: 30,
		max: 60,
		colour: '#E6F5A8'
	},
	{
		min: 60,
		max: 120,
		colour: '#B3Df76'
	},
	{
		min: 120,
		max: 240,
		colour: '#6ABD58'
	},
	{
		min: 240,
		max: 480,
		colour: '#1A9641'
	},
	{
		min: 480,
		max: 20000,
		colour: '#055B1E'
	}
];

//Base Layers
var osmurl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmbaselayer = L.tileLayer(osmurl, { attribution: attribution, maxZoom: 18 }); //Create the Base Layer

var vectorTileOptions = {
	rendererFactory: L.canvas.tile,
	interactive: true,
	maxNativeZoom: 10,
	updateWhenZooming: false,
	keepBuffer: 1,
	vectorTileLayerStyles: {
		mobileq3data: function (properties, zoom) {
			var getTileStructure = function (fillColor) {
				return {
					weight: 0,
					fill: true,
					fillOpacity: 0.75,
					fillColor: fillColor
				}
			}

			var speed = properties.avg_d_kbps / 1000;
			var colour = colourSpeedRanges.filter(obj => speed >= obj.min && speed < obj.max)[0].colour;
			return getTileStructure(colour);
		}
	}
}

function initialise() {
	map = L.map('map', { minZoom: 5 }).setView([52.5, -0.5], 10); //Create & Set View on the Map. 
	map.addLayer(osmbaselayer); //Add the OSM Base Layer. 
	map.addControl(search);
	map.zoomControl.setPosition('bottomright');
	L.DomUtil.setOpacity(map.zoomControl.getContainer(), 0.7);
	var OoklaQ3Layer = L.vectorGrid.protobuf("https://lightspeed2398.github.io/Ookla/MobileQ3/Tiles/{z}/{x}/{y}.pbf", vectorTileOptions);
	map.on('zoomend', function (e) {
		if (map.getZoom() > 10 && OoklaQ3Layer.options.rendererFactory != L.svg.tile) {
			OoklaQ3Layer.options.rendererFactory = L.svg.tile;
			OoklaQ3Layer.redraw();
		}
		if (map.getZoom() <= 10 && OoklaQ3Layer.options.rendererFactory != L.canvas.tile) {
			OoklaQ3Layer.options.rendererFactory = L.canvas.tile;
			OoklaQ3Layer.redraw();

		}
	});
	OoklaQ3Layer.on('click', function (e) {
		var averagedownloadspeed = e.layer.properties.avg_d_kbps / 1000;
		var averageuploadspeed = e.layer.properties.avg_u_kbps / 1000;
		var averagelatency = e.layer.properties.avg_lat_ms;
		var tests = e.layer.properties.tests;
		var devices = e.layer.properties.devices;
		console.log(e);
		L.popup({className: 'detailsPopup'})
			.setContent("<b>Average Download Speed: </b>" + averagedownloadspeed.toFixed(2) + "Mbps <br> <b> Average Upload Speed: </b>" + averageuploadspeed.toFixed(2) + "Mbps <br> <b> Average Latency: </b>" + averagelatency.toFixed(0) + "ms <br> <b> Number of Tests: </b>" + tests + "<br> <b> Number of Devices: </b>" + devices)
			.setLatLng(e.latlng)
			.openOn(map)
	});
	
	OoklaQ3Layer.addTo(map);

	var legend = L.control({ position: "bottomleft"});

	legend.onAdd = function(map){
		var div = L.DomUtil.create("div", "legend");
		div.innerHTML += "<h4>Speed</h4>";
		colourSpeedRanges.forEach(element => {
			div.innerHTML += `<i style="background: ${element.colour}"></i><span>${element.min}Mbps - ${element.max}Mbps</span><br>`
		});

		return div;
	}

	legend.addTo(map);
}