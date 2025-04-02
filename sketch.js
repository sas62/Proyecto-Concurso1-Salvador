//Variables
var FondoAguaP;
var pez;
var PLAY = 1;
var END = 0;
var SERVE;
var gameState = SERVE;
var arena_cofre, ancla_arena, arena_caja, arena_algas;
var instrucciones;
var sueloInvisible;
var grupoTiburones;
var grupoTiburonesG;
var grupoTiburonesH
var delfines=0;
var score=0;
var grupoDelfines;
var restart;
var gameOver;
var musica1;



function preload(){
  
  
  pezImg = loadImage("pez1.png");
  marImg = loadImage("FondoAgua.png");
  restart = loadImage("restart.png");
  arena_cofreImg = loadImage("arena_cofre.png");
  ancla_arenaImg = loadImage("ancla_arena.png");
  arena_cajaImg = loadImage("arena_caja.png");
  instruccionesImg = loadImage("instrucciones.png");
  pezR_IMG = loadImage("pezR.png");
  tiburonImg = loadImage("tiburon.png");
  delfinImg = loadImage("delfin.png");
  restartImg = loadImage("restart.png");
  
  gameOverImg = loadImage("gameOver.png")
  
  arena_algasImg = loadImage("arena_algas.png");
  
}//FIN DE FUNCTION PRELOAD


function setup(){
  createCanvas(windowWidth, windowHeight);
  
  grupoTiburones=new Group();
  grupoDelfines=new Group();
  grupoTiburonesG=new Group();
  grupoTiburonesH=new Group();

 
  
  FondoAguaP = createSprite(width/2,height/1.5, 100, 100)
  FondoAguaP.addImage("Agua", marImg);
  FondoAguaP.scale = 1.3
  


  pez = createSprite(width/6.5, height/2 + 10);
  pez.addImage("pez", pezImg);
  pez.addImage("pezR",pezR_IMG);
  pez.scale=2
  pez.setCollider("rectangle", -20,1,40,40);
  
   pez.debug=true 
    
  arena_cofre = createSprite(width/5.2  , height/1.5, 700,10);
  arena_cofre.addImage("arena_cofre", arena_cofreImg);
  arena_cofre.scale=0.3;
  
  ancla_arena = createSprite(width/2 , height/1.2  , 100,10);
  ancla_arena.addImage("ancla_arena", ancla_arenaImg);
  ancla_arena.scale=0.2;
  
  arena_caja = createSprite(width/1.3 - 74, height/1.3 + 2, 100,10);
  arena_caja.addImage("arena_caja", arena_cajaImg);
  arena_caja.scale=0.2;

  arena_algas = createSprite(width/1.1 + 60, height/1.3 + 20, 100,10);
  arena_algas.addImage("arena_algas", arena_algasImg);
  arena_algas.scale=0.2;
  
  sueloInvisible = createSprite(width/6, height/1 , 100,100);
  sueloInvisible.visible = false;

  restart = createSprite(width/2,height/2);
  restart.addImage("restart", restartImg);
  restart.visible = false;
  gameOver = createSprite(width/2, height/2 - 100);
  gameOver.addImage("gameOver", gameOverImg);
  gameOver.visible = false;

  
  
}//FIN DE FUNCTION SETUP

function draw(){

  
  
  if(gameState===PLAY){
    
    background(marImg)

    FondoAguaP.visible=true;

    if(keyDown("w")&& pez.y>315){
      pez.velocityY=-11.5;
      
    }

    FondoAguaP.velocityX = -(15.5 + 4*frameCount/300);
    pez.velocityY=pez.velocityY+0.3;//gravedad del pez
    
    
    
    if(keyDown("s")){
      pez.velocityY=+10;
    }
    
    
    pez.visible=true;
    arena_caja.visible=true;
    ancla_arena.visible=true;
    arena_caja.visible=true; 
    arena_cofre.visible=true;
    arena_algas.visible=true;

    if(keyDown("R")){
      pez.changeImage("pezR", pezR_IMG);
    }
     
    if(keyDown("V")){
      pez.changeImage("pez", pezImg);
    }

     
    if(grupoDelfines.isTouching(pez)){
     delfines = delfines + 1;
      grupoDelfines.destroyEach();
    }

    textSize(30);
    fill("blue")
    text("Delfines: " + delfines, windowWidth/1.9 , windowHeight/15 )

    score=score + Math.round(frameCount/60);
    textSize(30);
    fill("red");
    text("Score: " + score, windowWidth/3, windowHeight/15);
    
    crearTiburones();
    crearDelfines();
    crearTiburonesG();
    crearTiburonesH();
    
    if(grupoTiburones.isTouching(pez)){
      gameState = END;
    }
    if(grupoTiburonesG.isTouching(pez)){
      gameState = END;
    }

    if(grupoTiburonesH.isTouching(pez)){
      gameState = END;
    }
    
    
      
    
    

    
      
    
   
    
  
  
  pez.collide(sueloInvisible);
  
  
  if(gameState===SERVE){
    background(instruccionesImg);
    
    if(keyDown("space")){
      gameState=PLAY;
      frameCount = 0;
    }
    
    FondoAguaP.visible=false;
    pez.visible=false;
    arena_caja.visible=false;
    ancla_arena.visible=false;
    arena_caja.visible=false;
    arena_cofre.visible=false;
    arena_algas.visible=false;
  }
  
  
  if(gameState===END){
   
    FondoAguaP.visible=false;

    grupoDelfines.setVelocityXEach(0);
    grupoTiburones.setVelocityXEach(0);
    grupoTiburonesG.setVelocityXEach(0);
    grupoTiburonesH.setVelocityXEach(0);

    grupoDelfines.destroyEach();
    grupoTiburones.destroyEach();
    grupoTiburonesG.destroyEach();
    grupoTiburonesH.destroyEach();


    
    
    grupoTiburonesG.setLifetimeEach(-1);
    grupoDelfines.setLifetimeEach(-1);
    grupoTiburones.setLifetimeEach(-1);
    grupoTiburonesH.setLifetimeEach(-1);
    
    
    restart.visible = true;
    gameOver.visible = true;
    pez.velocityY = 0;
  
    if(mousePressedOver(restart)){
      reinicio();

    }
  }
  if(FondoAguaP.x<400){
    FondoAguaP.x=FondoAguaP.width/2
  };
  
  
  
   
  
  drawSprites();

}//FIN DE FUNCTION DRAW



function crearTiburones(){ 
  var altura=Math.round(random(20,600));
  if (frameCount%80===0){
    var tiburon = createSprite(1300,altura,40,20);
    tiburon.addImage("tiburon", tiburonImg);
    tiburon.scale = 3.7;
    tiburon.velocityX = -(5 + 5.5*frameCount/300);
    tiburon.lifetime=1100;
    //tiburon.debug = true;
    tiburon.setCollider("rectangle", 1,1,20,14);
    grupoTiburones.add(tiburon);
   
  }

  
}

function crearTiburonesG(){
  if (frameCount%100===0){
    var tiburonG = createSprite(1300,0,40,20);
    tiburonG.addImage("tiburon", tiburonImg);
    tiburonG.scale = 3.7;
    tiburonG.velocityX = -(6 + 5.5*frameCount/300);
    tiburonG.velocityY = + (3 + 2.5*frameCount/300);
    tiburonG.lifetime=1100;
    tiburonG.debug = true;
    tiburonG.setCollider("rectangle", 1,1,20,14);
    grupoTiburonesG.add(tiburonG);
  }
}

function crearTiburonesH(){
  if (frameCount%120===0){
    var tiburonH = createSprite(1300,windowHeight/0.8,40,20);
    tiburonH.addImage("tiburon", tiburonImg);
    tiburonH.scale = 3.7;
    tiburonH.velocityX = -(7 + 5.5*frameCount/300);
    tiburonH.velocityY = - (3 + 3*frameCount/300);
    tiburonH.lifetime=800;
    tiburonH.debug = true;
    tiburonH.setCollider("rectangle", 1,1,20,14);
    grupoTiburonesH.add(tiburonH);
  }
}
 
function crearDelfines(){ 
  var altura=Math.round(random(20,400));
  if (frameCount%180===0){
    var delfin = createSprite(1300,altura,40,20);
    delfin.addImage("delfin", delfinImg);
    delfin.scale = 3.7;
    delfin.velocityX = -(5 + 4*frameCount/300);
    delfin.lifetime=1100;
    delfin.setCollider("rectangle", 8,1,20,14);
    grupoDelfines.add(delfin);
    delfin.debug = true;
  
  }

}


function reinicio(){
  gameState = PLAY
  score = 0;
  delfines = 0;
  restart.visible = false;
  frameCount = 0;
  gameOver.visible = false;

}


