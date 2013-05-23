```javascript
// map.js
define(['leaflet'], function(L) {
    function init() {
       // Do something cool with leaflet
    }
    return {
        'init': init
    }
});

// project.js
require(['wq/app', 'map'], 
function(app, map) {
   app.init(...);
   map.init();
});

// Working on AMD for d3...
// require(['d3'], function(d3) {
// }
```
