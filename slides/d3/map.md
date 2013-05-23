```javascript
var projection = 
 d3.geo.transverseMercator()
  .rotate([95, -45])
  .scale(4000)
  .translate([225, 350]);
var path = d3.geo.path()
 .projection(projection);

var colorScale = 
 d3.scale.threshold()
  .domain(
    [62500, 125000, 250000, 500000]
  )
  .range(
    ["#edf8fb","#b3cde3","#8c96c6",
     "#8856a7","#810f7c"]
  );

function fill(d) {
  return colorScale(d.properties.POPULATION);
}

svg.append("g")
 .selectAll("path")
  .data(counties)
   .enter()
   .append("path")
    .attr("d", path)
    .attr("fill", fill)
    .attr("stroke", "black");
```
