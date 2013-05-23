```javascript
function id(county) {
 return county.properties.ID
}

svg.selectAll('rect')
 .data(sorted, id)
 .transition()
  .duration(1000)
  .attr('x', function(d, i) {
   return xscale(i);
  });

```
