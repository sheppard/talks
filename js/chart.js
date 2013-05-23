define(['wq/lib/d3', 'data'],
function(d3, data) {

function run(){
    var conf = data['annotate'];
    var svg = d3.select('#table-chart');
    var auto = true;
    var i = 0;
    step();
    function step(reverse) {
        var sconf = conf.steps[i];
        var tables = []
        for (t in sconf.tables)
            tables.push({'id': t, 'data': sconf.tables[t]});

        var titems = svg.selectAll('g.table')
            .data(tables, function(d) { return d.id })
        titems.enter().append('g')
            .attr('class', 'table')
            .attr('transform', transform(i, i > 0, false, true))
            .append('text').text(function(d){ return d.data.name })
        titems.transition()
            .duration(2000)
            .attr('transform', transform(i, false, false, true))

        var items = svg.selectAll('g.item')
            .data(sconf.items, id)

        items.enter().append('g')
            .attr('class', 'item')
            .attr('transform', transform(i, i > 0))
            .style('font-weight', function(d) {
                if (row(d) == 0)
                    return 'bold';
            })
            .append('text');

        items.transition()
            .duration(2000)
            .attr('transform', transform(i))
            .style('font-weight', function(d) {
                if (row(d) == 0)
                    return 'bold';
            })
            .select('text').text(text)

        items.exit().transition()
            .duration(2000)
            .attr('transform', transform(i, true, reverse))
            .remove()

        if (auto)
            setTimeout(function() {
                if (auto)
                    next();
            }, 10000);
    }

    function next() {
        i++;
        if (i >= conf.steps.length) {
            i = conf.steps.length - 1;
            return;
        }
        step();
    }

    function prev() {
        i--;
        if (i < 0) {
            i = 0;
            return;
        }
        step(true);
    }

    function id(d) {
        return d[0];
    }
    function table(d) {
        return d[1];
    }
    function row(d) {
        return d[2];
    }
    function col(d) {
        return d[3];
    }
    function text(d) {
        return d[4];
    }
    function header(d) {
        return d[5];
    }

    function transform(i, init, reverse, title) {
        return function (d) {
            var tbl = title ? d.data : conf.steps[i].tables[table(d)];
            var from = conf.steps[i].from;
            if (reverse) {
                tbl = conf.steps[i+1].tables[table(d)];
                from = conf.steps[i+1].from;
            }

            var x = 110 + tbl.x;
            if (!title)
                for (var c = 0; c < col(d); c++)
                    x += tbl.columns[c];

            var y = 130 + tbl.y;
            if (!title)
                y += row(d) * 20 + 30;

            if (init)
                if (from == "top")
                    y = -20;
                else if (from == "left")
                    x = -100;
                else
                    if (x < y)
                        x = -100;
                    else
                        y = -20;

            return 'translate(' + x + ',' + y + ')';
        }
    }
}

return {
   'run': run
}

});
