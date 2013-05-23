```javascript
function project(pt) {
  var result = map.latLngToLayerPoint(
    L.latLng(pt[1], pt[0])
  );
  return [result.x, result.y];
}

function reset() {
    var ll = project(bounds[0]);
    var ur = project(bounds[1]);
    svg.attr("width", ur[0] - ll[0])
       .attr("height", ll[1] - ur[1])
       .style("margin-left", ll[0] + "px")
       .style("margin-top", ur[1] + "px");

    svg.select('g')
        .attr("transform",
              "translate(" + -ll[0] + "," + -ur[1] + ")")
    svg.selectAll('path').attr('d', path);
}

var path = d3.geo.path().projection(project);
var svg = d3.select(map.getPanes().overlayPane)
             .append('svg')
map.on("viewreset", reset);
```
