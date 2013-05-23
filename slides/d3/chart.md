```javascript

var chartWidth = 500, 
    chartHeight = 300;

function name(d) {
 return d.properties.NAME;
}

function population(d) {
 return d.properties.POPULATION;
}

var xscale = d3.scale.linear()
 .domain([0, counties.length])
 .range([0, chartWidth]);

var yscale = d3.scale.linear()
 .domain([0, d3.max(counties, population)])
 .range([0, chartHeight]);

svg.selectAll('rect')
 .data(counties)
 .enter().append('rect')
   .attr('title', name)
   .attr('width', 3)
   .attr('height', function(d) {
     return yscale(population(d));
   })
   .attr('x', function(d, i) {
     return xscale(i);
   })
   .attr('y', function(d) {
     return (chartHeight - yscale(population(d)));
   });
```
