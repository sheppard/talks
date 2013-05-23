```python
from wq.io.gis import GisIO

# data = CsvIO('counties.csv')
data = GisIO('counties.shp')

for county in data:
    print county.id, county.area
```
