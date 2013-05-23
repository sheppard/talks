```javascript
// Example "class" with getter and setter
function Example() {
    var number;

    this.getNumber = function() {
        return number;
    }

    this.setNumber = function(num) {
        number = num;
        console.log("Number changed to " + num);
    };
}

var example = new Example();
example.setNumber(5); // Number changed to 5
var result = example.getNumber();
console.log(result); // 5
```
