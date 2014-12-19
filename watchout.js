// start slingin' some d3 here.
//decalre a variable to store enemies
var enemies = [];
//function to create an amount of enemies in different positions
var generateEnemies = function(enemies, nEnemies){
  for (var i=0; i<nEnemies; i++){
    //generate random position
    var cx = 40 + Math.random() * 420;
    var cy = 40 + Math.random() * 420;
    //create enemy
    var enemy = {}
    enemy.cx = cx;
    enemy.cy = cy;
    enemy.r = 40;
    enemy.stroke = "black";
    enemy["stroke-width"] = 3;
    enemy.fill = "red";

    //push enemy into enemies array
    enemies.push(enemy);
  }
}
generateEnemies(enemies,7);
//render the enemies on the canvas with d3
var addEnemies = d3.select('svg').selectAll('circle');
  addEnemies.data(enemies)
  .enter()
  .append('circle')
  .attr('cx',function(d){return d.cx;})
  .attr('cy',function(d){return d.cy;})
  .attr('r',function(d){return d.r;})
  .style('fill','red');
