SVG
---

```xml
<svg>
  <circle r=50 cx=100 cy=100>
</svg>
```

Canvas
------
```xml
<canvas id="canvas">
```

```javascript
var ctx = document.getElementById('canvas').getContext('2d');
ctx.beginPath();
ctx.arc(100, 100, 50, 0, Math.PI * 2);
ctx.fill();
```
