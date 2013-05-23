```javascript
// Example "class" with chainable getter/setters
function Example() {
    var x, y;
    var self = this;

    this.x = function(value) {
        if (arguments.length === 0)
            return x;
        x = value;
        console.log("X changed to " + x);
        return self;
    };

    this.y = function(value) {
        if (arguments.length === 0)
            return y;
        y = value;
        console.log("Y changed to " + y);
        return self;
    };

    this.coords = function() {
        return [x, y];
    }
}
var example = new Example();
example.x(5).y(9); // X changed to 5, Y changed to 9
console.log(example.coords()); // [5, 9];
```
