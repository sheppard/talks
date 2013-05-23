define(['wq/pages', 'leaflet', 'data'],
function(pages, L, data) {

L.Icon.Default.imagePath = "./css/wq/lib/images";

var hhh = [44.9714,-93.2448];

var maps = {
    'wmMap': function() {
        var tileUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
        var map = L.map(maps.slideId + '_map').setView([46.5, -94.5], 6);
        L.tileLayer(tileUrl).addTo(map);
        return map;
    },
    'utmMap': function() {
        var extent = L.latLngBounds([40, -100], [50, -90]);
        var crs = new L.Proj.CRS('EPSG:26915',
           '+proj=utm +zone=15 +ellps=GRS80 +datum=NAD83 +units=m +no_defs',
           {'resolutions': [
               214.023738464144,
               107.011736940141,
               53.5060007620015,
               26.7528680890695,
               13.376566336466,
               6.68815087630175,
               3.34407543815088,
               1.67217001100669,
               0.836085005503344,
               0.418042502751672
            ],
            'origin': [-20037508.342787, 20037508.342787]});
        var map = L.map(maps.slideId + '_map', {
            'crs': crs,
            'maxBounds': extent,
            'continuousWorld': true,
            'worldCopyJump': false
        }).setView(L.latLng(hhh), 0);
        return map;
    },
    'leaflet.first': function() {
        var map = maps.wmMap();
        setTimeout(function() {
            map.locate({
                'setView': true,
                'maxZoom': 12
            });
        }, 2000);
    },
    'leaflet.marker': function() {
        var map = maps.wmMap();
        L.marker(hhh)
           .bindPopup("Hello, world")
           .addTo(map);
    },
    'leaflet.geojson': function() {
        var map = maps.wmMap();
        L.geoJson(data['mn-state-parks']).addTo(map);
    },
    'leaflet.customize': function() {
        var map = maps.wmMap();
        L.geoJson(data['mn-state-parks'], {
            'pointToLayer': function(data, loc) {
                return L.marker(loc).bindPopup(data.properties.SP_NAME);
            }
        }).addTo(map);
    },
    'leaflet.cluster': function() {
        var map = maps.wmMap();
        var cluster = new L.MarkerClusterGroup().addTo(map);
        L.geoJson(data['mn-state-parks'], {
            'pointToLayer': function(data, loc) {
                return L.marker(loc).bindPopup(data.properties.SP_NAME);
            }
        }).addTo(cluster);
        return map;
    },
    'leaflet.basemaps': function() {
        var map = maps.utmMap();
        var tileUrl = 'http://gis2.metc.state.mn.us/ArcGIS/rest/services/BaseLayer/';
        var streetsUrl = tileUrl + 'UTMBaseMap/MapServer/tile/{z}/{y}/{x}';
        var streets = L.tileLayer(streetsUrl, {
            'continuousWorld': true   
        }).addTo(map);
        
        var hybrid = L.layerGroup();
        L.tileLayer.wms('http://geoint.lmic.state.mn.us/cgi-bin/mncomp', {
           'layers': 'mncomp',
           'continuousWorld': true,
           'tileSize': 1024
        }).addTo(hybrid);
        var aerial = L.tileLayer.wms('http://geoint.lmic.state.mn.us/cgi-bin/mncomp', {
           'layers': 'mncomp',
           'continuousWorld': true,
           'tileSize': 1024
        });
        var labelsUrl = tileUrl + 'Hybrid/MapServer/tile/{z}/{y}/{x}';
        L.tileLayer(labelsUrl, {'continuousWorld': true}).addTo(hybrid);

        var cluster = new L.MarkerClusterGroup().addTo(map);
        L.geoJson(data['mn-state-parks'], {
            'pointToLayer': function(data, loc) {
                return L.marker(loc).bindPopup(data.properties.SP_NAME);
            }
        }).addTo(cluster);
        L.control.layers({
            'Street': streets,
            'Aerial': aerial,
            'Hybrid': hybrid
        }, {
            'Minnesota Parks': cluster
        }).addTo(map);
        return map;
    }
}

function run(slide) {
    if (maps[slide.id]) {
        maps.slideId = slide.id;
        maps[slide.id]();
    }
}

return {
   'run': run,
   'maps': maps
}

});
