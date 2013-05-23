```javascript
L.geoJson(parks, {
 'pointToLayer': 
   function(feature, pt) {
    return L.marker(pt)
     .bindPopup(
       feature.properties.SP_NAME
     );
   }
}).addTo(map);

```
