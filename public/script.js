window.addEventListener('load', function() {
  if("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position){
      d3.select('body').insert('div',':first-child').text("You are at: "+position.coords.latitude+", "+position.coords.longitude);
    });
  }
  d3.json('/locations.json', function(err, locations){
    if(err) return console.log(err);
    var table = d3.select('body').append('table');
    table.append('thead');
  });
  d3.json('/united-states.json', function(err, usa) {
    if(err) return console.log(err);
    //create svg
    var width = 760;
    var height = 480;
    var svg = d3.select('body').append('svg')
    .attr('width',width);
    .attr('height',height);
    var projection = d3.geoAlbersUsa()
    .scale(1000)
    .translate([width/2,height/2]);
    var path = d3.geoPath().projection(projection);
    svg.insert('path','.land-borders')
    .datum(topojson.feature(usa, usa.objects.land))
    .attr('class','land')
    .attr('d','path');
  });
});
