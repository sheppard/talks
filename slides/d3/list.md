```javascript
var fmt = d3.format(',');
var table =
   d3.select('#container')
      .append('table');

var rows =
  table.selectAll('tr')
    .data(counties)
      .enter()
      .append('tr');

rows.append('td')
 .style('font-weight', 
        'bold')
 .text(function(d) {
  return d.properties.NAME;
 });

rows.append('td')
 .text(function(d) {
  return fmt(
   d.properties.POPULATION
  );
 });
```
