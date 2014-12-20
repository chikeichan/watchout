//Player Data
var Player = function(name,salary,points,minutes){
  var player = {}
  player.name = name;
  player.salary = salary;
  player.points = points;
  player.minutes = minutes;
  player.dx;
  player.dy;
  return player;
}

var players = [];

players.push(Player('LeBron James',20.6,2089,2902));
players.push(Player('Kobe Bryant',23.5,2133,3013));
players.push(Player('Anthony Davis',5.14,1394,2358));
players.push(Player('Derrick Rose',18.9,159,311));
players.push(Player('Kawhi Leonard', 1.81,844,1923));
players.push(Player('Randy Foye', 2.5,1068,2485));

var height = 600;
var width = 700;
var svg = d3.select('body').append('svg')
  //.attr('class', 'visualization')
  .attr('height',height)
  .attr('width',width);


var update = function(yAxis){
  var player = svg.selectAll('circle').data(players)


  //create new circle
  player.enter('circle')
    .append('circle')
    .attr('cx',50)
    .attr('cy',550)
    .transition().duration(6000)
    .attr('cx',function(d){return d.salary/0.05})
    .attr('cy',function(d){return 500-d[yAxis]/6.2})
  //update exisiting circle
  player.transition().duration(1000)
    .attr('r',5)
    .attr('cx',function(d){return 50+d.salary/0.05})
    .attr('cy',function(d){return 550-d[yAxis]/6.2})
    .attr('id',function(d){return d.name});

  player.on('mouseover',function(d){
    d3.select('svg').append('text')
      .text(d.name)
      .transition().duration(250)
      .attr('x',$(this).attr('cx')-5)
      .attr('y',$(this).attr('cy')-6)
  }).on('mouseleave',function(d){
    d3.select('text').remove()
  })



}
update("points");
update("points");
$(document).ready(function(){
  $('select').on('change',function(e){
    console.log(this.value);
    update(this.value);
  });
})
