```xml
<div id='root'>
  <p>First</p>
  <p>Second</p>
  <p>Third</p>
</div>
```

```javascript
d3.select('#root')
 .selectAll('p')
   .style('color', 'green')
   .append('strong')
      .text('Test');
```
