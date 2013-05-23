```javascript
// myapp.js
require(["wq/app", "config", "templates"],
function(app, config, templates) {
app.init(config, templates);
});

// mymodule.js
require(["wq/store", "wq/pages", "wq/appcache"]
function(ds, pages, appcache) {

ds.init("http://my-rest-service/", {"format": "json"});

...

});

```
