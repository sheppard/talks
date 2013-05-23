```javascript
// Example "class" with single getter/setter
function Example() {
    var number;

    this.number = function(num) {
        if (arguments.length === 0)
            return number;
        number = num;
        console.log("Number changed to " + num);
    };
}

// Usage
var example = new Example();
example.number(5); // Number changed to 5
console.log(example.number()); // 5
```
