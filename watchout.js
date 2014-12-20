// start slingin' some d3 here.
// Field ==================================================
var width = 500;
var height = 500;
var svg = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height)



// Player Data ============================================
var player = {}
player.cx = width/2;
player.cy = height/2;
player.r = 20;
player.color = 'black';
player.type = 'player';
player.blinking = false;
player.move = function(){
  //console.log('Yo')
}












//Enemies Data ============================================
//decalre a variable to store enemies
var enemies = [];
//function to create an amount of enemies in different positions
var generateEnemies = function(enemies, nEnemies){
  for (var i=0; i<nEnemies; i++){
    //generate random position
    var cx = 42 + Math.random() * 416;
    var cy = 42 + Math.random() * 416;
    var dx = -18 + Math.random()*36;
    var dy = -18 + Math.random()*36;
    //create enemy
    var enemy = {}
    enemy.cx = cx;
    enemy.cy = cy;
    enemy.dx = dx;
    enemy.dy = dy;
    enemy.r = 40;
    enemy.color = 'red';
    enemy.type = 'enemy';
    //move
    enemy.move = function(){
      this.cx = this.cx + this.dx;
      this.cy = this.cy + this.dy;
      if(this.cx <= 42 || this.cx >= 458){
        this.dx = -this.dx;
      }

      if(this.cy <= 42 || this.cy >= 458){
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

//Rendering Script =====================================
var update = function(data){
  //svg.selectAll('circle').remove();
  svg.selectAll('circle').data(data)
  // .enter()
  // .append('circle')
  .attr('cx',function(d){return d.cx;})
  .attr('cy',function(d){return d.cy;})
  .attr('r',function(d){return d.r;})
  .attr('stroke', 'black')
  .attr('stroke-width', '2')
  .style('fill',function(d){return d.color});
};
// var force = d3.layout.force();



//Game Logic ==========================================
var highScore = 0;
var currentScore = 0;
var collisions = 0;

var dragmove = function(d) {
  //console.log(d3.mouse(this));
  if (d3.mouse(this)[0]>20 && d3.mouse(this)[0]<=480){
    d.cx = d3.mouse(this)[0];
  }
  if(d3.mouse(this)[1]>=20 && d3.mouse(this)[1]<=480){
    d.cy = d3.mouse(this)[1];
  }
}
var drag = d3.behavior.drag()
  //.origin(function(d) {return d; })
  .on('drag', dragmove);

  var collision = function(){
  //COllision logic
  //loop thru each enemy
    var player = enemies[enemies.length-1];
    for (var i=0; i<enemies.length-1; i++){
      //check if enemy is within colission distance from player
      var delx = enemies[i].cx - player.cx;
      var dely = enemies[i].cy - player.cy;
      var c = Math.sqrt(delx*delx + dely*dely);
      if (c<60 && !player.blinking){
      //reset current score
      currentScore = 0;
      //add one to collision
      collisions++;
      $('.collisions>span').html(collisions);
      //start flash mode
      player.blinking = true;
      var blinking = setInterval(function(){
        if(player.color === 'white'){
          player.color = 'black';
        } else {
          player.color = 'white';
        }
      },130)
      //end flash mode in 1000ms
      setTimeout(function(){
        player.blinking = false;
        clearInterval(blinking);
        player.color = 'black';
      }, 1000);
    }
  }
}
enemies.push(player);
  svg.selectAll('circle').data(enemies)
  .enter()
  .append('circle')
  .attr('class',function(d){return d.type;})
  .attr('cx',function(d){return d.cx;})
  .attr('cy',function(d){return d.cy;})
  .attr('r',function(d){return d.r;})
  .attr('stroke', 'black')
  .attr('stroke-width', '2')
  .style('fill',function(d){return d.color})
  .call(drag)
//enemies.pop();


//Timer ================================================
//timer function, call once every 33ms
setInterval(function(){
  moveEnemies(enemies);
  currentScore++;
  $('.current>span').html(currentScore);
  if (currentScore>highScore){
    highScore = currentScore
    $('.high>span').html(highScore);
  }

  //svg.selectAll('circle').remove();
  //enemies.push(player);
  update(enemies);
  collision()

},40)




