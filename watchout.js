// start slingin' some d3 here.
var width = 500;
var height = 500;
var svg = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height)
//decalre a variable to store enemies
var enemies = [];
//function to create an amount of enemies in different positions
var generateEnemies = function(enemies, nEnemies){
  for (var i=0; i<nEnemies; i++){
    //generate random position
    var cx = 40 + Math.random() * 420;
    var cy = 40 + Math.random() * 420;
    var dx = -6 + Math.random()*12;
    var dy = -6 + Math.random()*12;
    //create enemy
    var enemy = {}
    enemy.cx = cx;
    enemy.cy = cy;
    enemy.dx = dx;
    enemy.dy = dy;
    enemy.r = 40;
    //move
    enemy.move = function(){
      this.cx = this.cx + this.dx;
      this.cy = this.cy + this.dy;
      if(this.cx <= 40 || this.cx >= 460){
        this.dx = -this.dx;
      }

      if(this.cy <= 40 || this.cy >= 460){
        this.dy = -this.dy;
      }
    }
    //push enemy into enemies array
    enemies.push(enemy);
  }
}
generateEnemies(enemies,7);
//move
var moveEnemies = function(enemies){
  for(var i = 0; i<enemies.length; i++){
    enemies[i].move();
  }
}
//render
var updateEnemies = function(data){
  svg.selectAll('circle').remove();
  svg.selectAll('circle').data(data)
  .enter()
  .append('circle')
  .attr('cx',function(d){return d.cx;})
  .attr('cy',function(d){return d.cy;})
  .attr('r',function(d){return d.r;})
  .style('fill','red');
};

//timer function, call once every 33ms
setInterval(function(){
  moveEnemies(enemies);
  updateEnemies(enemies);
},33)




