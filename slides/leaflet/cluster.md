```javascript
// Requires plugin
var cluster = 
  new L.MarkerClusterGroup()
    .addTo(map);

L.geoJson(parks, {
 'pointToLayer': function() {
   ...
 }
}).addTo(cluster);
```
