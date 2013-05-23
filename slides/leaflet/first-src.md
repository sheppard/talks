```xml
<div id="map-container" style="height:400px"></div>
```

```javascript
var map = L.map("map-container")
   .setView([46.5, -94.5], 6)
   .locate({"setView": true});

// Add a tile layer
var layer = new L.TileLayer(
    "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
);
map.addLayer(layer);

// Equivalent:
L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png")
   .addTo(map);
```
