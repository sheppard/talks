```javascript

// UTM 15 projection
// Requires Proj4leaflet plugin        
var crs = new L.Proj.CRS("EPSG:26915",
 "+proj=utm +zone=15 +ellps=GRS80 +datum=NAD83 +units=m +no_defs",
 {
  "resolutions": [214.02, ..., ... ]
  "origin": [-20037508.342787, 20037508.342787]
 }
);

// Use continuousWorld to bypass Leaflet"s lat/long checker
var map = L.map("map-container", {
 "crs": crs,
 "maxBounds": extent,
 "continuousWorld": true,
 "worldCopyJump": false
});

...

// Custom tile layer
var tileUrl = "http://gis2.metc.state.mn.us/ArcGIS/rest/"
 +"services/BaseLayer/UTMBaseMap/MapServer/tile/{z}/{y}/{x}";
var streets = L.tileLayer(tileUrl, {
 "continuousWorld": true
}).addTo(map);

// WMS layer
var aerial = L.tileLayer.wms(
 "http://geoint.lmic.state.mn.us/cgi-bin/mncomp",
 {
  "layers": "mncomp",
  "continuousWorld": true,
  "tileSize": 1024
 }
);

// Layer toggle
L.control.layers({
 "Street": streets,
 "Aerial": aerial
},
{
 "Minnesota Parks": cluster
}).addTo(map);
```

