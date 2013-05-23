```javascript
// Example "class" with chainable getter/setter
function Example() {
    var number;
    var self = this;

    this.number = function(num) {
        if (arguments.length === 0)
            return number;
        number = num;
        console.log("Number changed to " + num);

        // Support chaining
        return self;
    };
}

var example = new Example();
example.number(5).number(9); // Number changed to 5, Number changed to 9
console.log(example.number()); // 9
```
