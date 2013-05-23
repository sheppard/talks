```javascript
var parks = {
 "type": "FeatureCollection",
 "features": [
  { 
   "type": "Feature",
   "id": 1, 
   "properties": { 
     "SP_NAME":
       "Itasca State Park"
   },
   "geometry": { 
     "type": "Point", 
     "coordinates":
       [ -95.22.., 47.18.. ]
...
};
L.geoJson(parks).addTo(map);

```
