//Player Data
var Player = function(name,data){
  var player = {}
  player.name = name;
  player.salary = data.salary;
  player.points = data.tpt;
  player.minutes = data.tmin;
  player.gamesPlayed = data.gp;
  player.rebounds = data.treb;
  player.assists = data.tasst;
  player.steals = data.tstl;
  player.blocks = data.tblk;
  return player;
}

var players = [];
//Player Data

var currentPlayers = {};
_.each(stat,function(val,key){
  var k = val.name;
  if(!currentPlayers[k]){
    var gp = val.gp
    currentPlayers[k] = {
      gp: +val.gp,
      tmin: val.min*gp,
      tpt: val.points*gp,
      treb: val.rebound*gp,
      tasst: val.assist*gp,
      tstl: val.steal*gp,
      tblk: val.block*gp
    }
  } else {
    var gp = val.gp
    dup = {
      gp: +val.gp,
      tmin: val.min*gp,
      tpt: val.points*gp,
      treb: val.rebound*gp,
      tasst: val.assist*gp,
      tstl: val.steal*gp,
      tblk: val.block*gp
    }
    currentPlayers[k].gp += dup.gp;
    currentPlayers[k].tmin += dup.tmin;
    currentPlayers[k].tpt += dup.tpt;
    currentPlayers[k].treb += dup.treb;
    currentPlayers[k].tasst += dup.tasst;
    currentPlayers[k].tstl += dup.tstl;
    currentPlayers[k].tblk += dup.tblk;
  }
})
_.each(salary,function(val,key){
  if(!!currentPlayers[val.name]){
    var salary = val.salary.replace('$','');
        salary = salary.replace(',','');
        salary = salary.replace(',','');
    currentPlayers[val.name].salary = +salary;
  }
})

_.each(currentPlayers,function(data,player){
  if(!data.salary){
    delete currentPlayers[player];
  }
})
_.each(currentPlayers,function(data,player){
  players.push(Player(player,data));
  // console.log(data.salary)
})

    // "name": "Quincy Acy",
    // "gp": "7",
    // "min": "8.5",
    // "points": "2.7",
    // "rebound": "2.1",
    // "assist": "0.6",
    // "steal": "0.57",
    // "block": "0.43"

//
var height = 500;
var width = 900;
var svg = d3.select('body').append('svg')
  //.attr('class', 'visualization')
  .attr('height',height)
  .attr('width',width);



  svg.append('line')
    .attr('x1',40)
    .attr('y1',455)
    .attr('x2',40)
    .attr('y2',20)
    .attr('style', 'stroke:white;stroke-width:2')

  svg.append('line')
    .attr('x1',40)
    .attr('y1',455)
    .attr('x2',855)
    .attr('y2',455)
    .attr('style', 'stroke:white;stroke-width:2')

var update = function(yAxis){
  var player = svg.selectAll('circle').data(players)


  //create new circle
  player.enter()
    .append('circle')
    .attr('cx',50)
    .attr('cy',450)
    .transition().duration(1000)
    .attr('cx',function(d){return d.salary/40000})
    .attr('cy',function(d){
      var perPx;
      if(yAxis === 'minutes'){
        perPx = 430/3200;
      } else if(yAxis === 'points'){
        perPx = 430/3500;
      }
      return 450-d[yAxis]*perPx
    })
    .attr('fill','white')
      //update exisiting circle
  player.transition().duration(1000)
    .attr('r',3)
    .attr('cx',function(d){return 50+d.salary/40000})
    .attr('cy',function(d){
      var perPx;
      if(yAxis === 'minutes'){
        perPx = 430/3200;
      } else if(yAxis === 'points'){
        perPx = 430/2600;
      } else if(yAxis === 'gamesPlayed'){
        perPx = 430/83;
      } else if(yAxis === 'rebounds'){
        perPx = 430/1150;
      } else if(yAxis === 'assists'){
        perPx = 430/730;
      } else if(yAxis === 'steals'){
        perPx = 430/200;
      } else if(yAxis === 'blocks'){
        perPx = 430/220;
      }
      return 450-d[yAxis]*perPx
    })
    .attr('id',function(d){return d.name})
    .attr('fill','rgb(255, 97, 0)')
    .attr('stroke','black')
    .attr('stroke-width',1)


  player.on('mouseover',function(d){
    d3.select(this).transition().attr('r',7)
    d3.select('svg').append('text')
      .text(d.name)
      .attr('fill','white')
      .transition().duration(250)
      .attr('x',$(this).attr('cx')-5)
      .attr('y',$(this).attr('cy')-6)
  }).on('mouseleave',function(d){
    d3.select(this).transition().attr('r',3)
    d3.select('text').remove()
  })

}
//update("points");
update("points");
$(document).ready(function(){
  $('select').on('change',function(e){
    console.log(this.value);
    update(this.value);
    $('#y').html(this.value);
  });
})
