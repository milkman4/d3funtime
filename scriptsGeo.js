// // Popular / About Mike Bostock’s Block 3734308
// // Updated February 8, 2016
// // Albers Equal-Area Conic
//
// Open
// The Albers equal-area conic projection is available as d3.geo.albers. See also the interactive version.
//
// index.html#
//
// <!DOCTYPE html>
// <meta charset="utf-8">
// <style>
//
// .graticule {
//   fill: none;
//   stroke: #777;
//   stroke-width: .5px;
//   stroke-opacity: .5;
// }
//
// .land {
//   fill: #222;
// }
//
// .county-boundary {
//   fill: none;
//   stroke: #fff;
//   stroke-width: .5px;
// }
//
// .state-boundary {
//   fill: none;
//   stroke: #fff;
// }
//
// </style>
// <body>
// <script src="//d3js.org/d3.v3.min.js"></script>
// <script src="//d3js.org/topojson.v1.min.js"></script>
// <script>

var width = 960,
    height = 500;

var projection = d3.geo.albers()
    .rotate([96, 0])
    .center([-.6, 38.7])
    .parallels([29.5, 45.5])
    .scale(1070)
    .translate([width / 2, height / 2])
    .precision(.1);

var path = d3.geo.path()
    .projection(projection);

var graticule = d3.geo.graticule()
    .extent([[-98 - 45, 38 - 45], [-98 + 45, 38 + 45]])
    .step([5, 5]);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

svg.append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path);

d3.json("https://bl.ocks.org/mbostock/raw/4090846/us.json", function(error, us) {
  if (error) throw error;

  svg.insert("path", ".graticule")
      .datum(topojson.feature(us, us.objects.land))
      .attr("class", "land")
      .attr("d", path);

  svg.insert("path", ".graticule")
      .datum(topojson.mesh(us, us.objects.counties, function(a, b) { return a !== b && !(a.id / 1000 ^ b.id / 1000); }))
      .attr("class", "county-boundary")
      .attr("d", path);

  svg.insert("path", ".graticule")
      .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
      .attr("class", "state-boundary")
      .attr("d", path);
});

d3.select(self.frameElement).style("height", height + "px");
