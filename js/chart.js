define(['wq/lib/d3', 'data', 'map', 'leaflet'],
function(d3, data, map, L) {
var chart = {};

var counties = data['mn-county-2010'].features.slice();
counties.sort(function(a, b) {
    return ((a.properties.NAME < b.properties.NAME) ? -1
          : (a.properties.NAME > b.properties.NAME  ? 1 : 0));
});


var charts = {
    'd3.sel': function() {
        charts.chart.selectAll('p')
            .style('color', 'green')
            .append('strong')
                .text('Test');
    },
    'd3.list': function() {
        var list = charts.chart.append('table');
        var formatter = d3.format(',');
        var rows = list.selectAll('tr')
          .data(counties)
          .enter()
          .append('tr');
        rows.append('td')
            .style('font-weight', 'bold')
            .text(function(d) {
                return d.properties.NAME;
            });
        rows.append('td')
            .text(function(d) {
                return formatter(d.properties.POPULATION);
            });
    },
    'd3.chart': function() {
        var width = 500, height = 300;

        function name(county) {
            return county.properties.NAME;
        }

        function population(county) {
            return county.properties.POPULATION;
        }

        var xscale = d3.scale.linear()
            .domain([0, counties.length])
            .range([0, width]);

        var yscale = d3.scale.linear()
            .domain([0, d3.max(counties, population)])
            .range([0, height]);

        var svg = charts.chart.append('svg');
        var bars = svg.selectAll('rect')
            .data(counties)
            .enter().append('rect')
               .attr('title', name)
               .attr('width', 3)
               .attr('height', function(d) {
                   return yscale(population(d));
               })
               .attr('x', function(d, i) {
                   return xscale(i);
               })
               .attr('y', function(d) {
                   return height - yscale(population(d));
               });
        return svg;
    },
    'd3.chart2': function() {
        var svg = charts['d3.chart']();
        var width = 500;
        var xscale = d3.scale.linear()
            .domain([0, counties.length])
            .range([0, width]);

        var ranked = counties.slice();
        ranked.sort(function(a, b) {
            return b.properties.POPULATION - a.properties.POPULATION;
        });

        function id(county) {
            return county.properties.ID;
        }

        setTimeout(function() {
        svg.selectAll('rect')
           .data(ranked, id)
           .transition()
              .duration(1000)
              .attr('x', function(d, i) {
                  return xscale(i);
              });
        }, 3000);
    },
    'd3.map': function() {
        var width = 500;
        var projection = d3.geo.transverseMercator()
           .rotate([95, -45])
           .scale(4000)
           .translate([225, 350]);
        var path = d3.geo.path().projection(projection);
        var scale = d3.scale.threshold().domain(
            [62500, 125000, 250000, 500000]
        ).range(
            ["#edf8fb","#b3cde3","#8c96c6","#8856a7","#810f7c"]
        );
        function fill(d) {
            return scale(d.properties.POPULATION);
        }

        var svg = charts.chart.append('svg');
        svg.append("g")
           .selectAll("path")
             .data(counties)
             .enter()
             .append("path")
               .attr("d", path)
               .attr("fill", fill)
               .attr("stroke", "black");
    },
    'integrate.map': function() {
        map.maps.slideId = 'integrate.map';
        var lmap = map.maps['leaflet.basemaps']();
        charts.addToMap(lmap);
    },
    'integrate.map2': function() {
        map.maps.slideId = 'integrate.map2';
        var lmap = map.maps['leaflet.cluster']();
        charts.addToMap(lmap);
    },
    'addToMap': function(lmap) {
        var width = 500;
        function project(pt) {
            var result = lmap.latLngToLayerPoint(L.latLng(pt[1], pt[0]));
            return [result.x, result.y];
        }
        var bounds = d3.geo.bounds(data['mn-county-2010']);
        var path = d3.geo.path().projection(project);
        var scale = d3.scale.threshold().domain(
            [62500, 125000, 250000, 500000]
        ).range(
            ["#edf8fb","#b3cde3","#8c96c6","#8856a7","#810f7c"]
        );
        function fill(d) {
            return scale(d.properties.POPULATION);
        }
        function reset() {
            var ll = project(bounds[0]);
            var ur = project(bounds[1]);
            svg.attr("width", ur[0] - ll[0])
               .attr("height", ll[1] - ur[1])
               .style("margin-left", ll[0] + "px")
               .style("margin-top", ur[1] + "px");
            
            svg.select('g')
                .attr("transform", "translate(" + -ll[0] + "," + -ur[1] + ")")
            svg.selectAll('path').attr('d', path);
        }
        var svg = d3.select(lmap.getPanes().overlayPane).append('svg')
          .style('opacity', 0.7);
        svg.append("g")
           .attr('class', 'leaflet-zoom-hide')
           .selectAll("path")
             .data(counties)
             .enter()
             .append("path")
               .attr("d", path)
               .attr("fill", fill)
               .attr("stroke", "black");
        lmap.on("viewreset", reset);
        reset();
    }
}

chart.run = function(slide) {
    if (!charts[slide.id])
        return;
    charts.chart = d3.select('#' + slide['two-column']);
    var fn = charts[slide.id];
    if (slide.delay)
        setTimeout(fn, slide.delay * 1000);
    else
        fn();
}

return chart;
});
