const canvas = document.getElementById("mycanvas")
canvas.width = "1300";
canvas.height = "600"
const ctx = canvas.getContext('2d');
let basico = 1;

let frames = 0;

let audio = new Audio();
let audiocomer = new Audio();
let audioengame = new Audio();
let audiogameover = new Audio();
let audioganaste = new Audio();
let audiocuack = new Audio();

let enemigos =[];
let asesinos =[];
let puntaje = 0;
let vidas = 10;
let go = 450
let interval;
audio.src =
 "https://ia600807.us.archive.org/22/items/DjBabySharkDanceRemix/BabyShark-DjNelzkie.mp3" ; 
audiocomer.src= "./assets/comertostada.mp3";
audioengame.src= "./assets/endgamebross.mp3";
audiogameover.src= "./assets/gameover.mp3";
audioganaste.src="./assets/ganaste.mp3"; 
audiocuack.src="./assets/cuack.mp3"; 
//Comida
let img1 = './images/delphi1.png'; 
let img2 = './images/perl1.png'; 
let img3 = './images/php1.png' ;
let img4 = './images/yellow.png' ;
imagenes = [img1,img2,img3,img4]; 

 //Asesinos
 let imagAsesino1 = './images/c++22.png';
 let imagAsesino2 = './images/python22.png';
 let imagAsesino3 = './images/rojo.png';
 imagenesAsesino = [imagAsesino1, imagAsesino2, imagAsesino3 ]; 
  
 // Ganar perder
 var imagGanar = new Image();
 imagGanar.src = './images/ganaste.jpg';

  var imagPerder = new Image();
  imagPerder.src = './images/perdiste.jpg';
//  let imagGanar = './images/ganaste.jpg';

class Shark { //se crea clase y función. 
  constructor(x, y, width, height) {
    this.x = 0;
    this.y = 0;
    this.width = width; 
    this.height = height; 
    
    this.image1 = new Image(); //nueva imagen
    this.image2 = new Image();
    this.image1.src = "./images/code.png"; 
    this.image2.src = "./images/code2.png"; 
    this.image = this.image1;
  }  
  
  collision(item) {
    return ( // colisiones 
        this.x < item.x + item.width &&
        this.x + this.width > item.x &&
        this.y < item.y + item.height &&
        this.y + this.height > item.y
    );
}
   draw() {    
    if (frames % 15 == 0) {
            this.image = this.image === this.image1 ? this.image2 : this.image1; // si imagen 1, entonces pasa a imagen 2 y viceversa
            //console.log("estoy cambiando imagen");
        }
    
    ctx.drawImage(this.image,this.x, this.y, this.width, this.height); // Pinta a Shark
    }     
}
document.onkeydown = function(e) { // se cambio de lugar los movimientos, 
    if (e.keyCode === 13 || e.keyCode ===65) {
        start();
      }
      
      if (e.keyCode === 32) {
        if (shark.x > canvas.width - 80) {
            shark.x = canvas.width - 80 
        }
        shark.x += 100;//derecho
      }  
     
    if (e.keyCode === 40) {        
        if (shark.y > canvas.height - 120){
            shark.y = canvas.height - 120
        }
        shark.y += 10; //abajo              
    }       
    if (e.keyCode === 38) {
        if (shark.y < 5){
            shark.y =5
        }
        shark.y -= 10;     // arriba         
     }
    if (e.keyCode === 37) {
        if (shark.x < 5){
            shark.x=5
        }
        shark.x -= 10; //izquierdo
             
      }
    if (e.keyCode === 39) {
        if (shark.x > canvas.width - 80) {
            shark.x = canvas.width - 80 
        }
        shark.x += 10;//derecho
      }   
      if (e.keyCode === 80) {
        pause();
      }   
    


  }; 
class Background { //Clase fondo
    constructor() { // se abre constructor
      this.x = 0; // posición de X en 0 
      this.y = 0; // posición de Y en 0 
      this.width = canvas.width; // posición de ancho igual a lo ancho de canvas
      this.height = canvas.height; //posición de alto igual a lo alto de canvas
      this.image = new Image(); // nueva imagen 
      this.image.src = "./images/fondo3.jpg"; // imagen de fondo
    }
  
    draw() { // se pinta el fondo 
      this.x= this.x-basico; // X = x -1 
      if (this.x < -canvas.width) this.x = 0; 
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height); 
  
      ctx.drawImage( 
        this.image, 
        this.x + canvas.width, 
        this.y,
        this.width,
        this.height
      ); 
    } 
  } 

const shark = new Shark(0, 0, 60, 60 ); //Se crea instancia del constructor de Shark
const background = new Background(); // Instancia del fondo

class Enemigo {// Enemigos
    constructor(x,y,width,height,imagenes) { 
      this.x = x; 
      this.y = y;
      this.width = width;
      this.height = height ;
      this.vx = 2; // Velocidad  x
      this.vy = -5 ; // Velocidad  y
      this.image = new Image()
      this.image.src = imagenes      
    }
    draw() {
        if (this.y > canvas.height - 120){//abajo            
            this.vy = -this.vy;           
        }
        if (this.y < 5){//arriba            
            this.vy = -this.vy;           
        }          
        if (this.x < 5){ //izquierdo            
            this.vx = -this.vx 
        }       
        if (this.x > canvas.width - 60) { //Derecho
            this.vx = -this.vx             
        }    
      this.x += this.vx;
      this.y +=this.vy;
      //this.y++
      ctx.drawImage(this.image, this.x, this.y,this.width, this.height )
    }    
  }

  /// clase 2

  class Asesino {// Enemigos
    constructor(x,y,width,height,imagenes) { 
      this.x = x; 
      this.y = y;
      this.width = width;
      this.height = height ;
      this.vx = 4; // Velocidad  x
      this.vy = -7 ; // Velocidad  y
      this.image = new Image()
      this.image.src = imagenes      
    }
    collision(item) {
      return ( // colisiones 
          this.x < item.x + item.width &&
          this.x + this.width > item.x &&
          this.y < item.y + item.height &&
          this.y + this.height > item.y
      );
    }
    draw() {
        if (this.y > canvas.height - 90){//abajo            
            this.vy = -this.vy;           
        }
        if (this.y < 5){//arriba            
            this.vy = -this.vy;           
        }          
        if (this.x < 5){ //izquierdo            
            this.vx = -this.vx 
        }       
        if (this.x > canvas.width - 60) { //Derecho
            this.vx = -this.vx             
        }    
      this.x += this.vx;
      this.y +=this.vy;
      //this.y++
      ctx.drawImage(this.image, this.x, this.y,this.width, this.height )
    }    
  }

  function generarAsesino() {
    if (!(frames % 200 === 0)) return;
    //debugger;
       
    
        const asesino1 = new Asesino(1230,Math.floor(Math.random() * 540),70,70, imagenesAsesino[Math.floor(Math.random() *imagenesAsesino.length)]);
       if(asesinos.length < 10){
        asesinos.push(asesino1);   
       } 
                 
    }
   
function drawAsesino (){
  asesinos.forEach((asesino,i) => {
         if(asesino.x + asesino.width < 0){
         }
         asesino.draw(); 
       if(asesino.collision (shark)){
        asesinos.splice(i,1);
        audiocuack.play();
         vidas --;
         console.log("estoy Te estoy matando");
         
     }                
    });
}
  
///////   FUNCIONES PARA GENERAR Y DIBUJAR ENEMIGOS   A Y U D A  
     function generaEnemigo() {
         if (!(frames % 100 === 0)) return;
         //debugger;        
             const enemigo1 = new Enemigo(1230,Math.floor(Math.random() * 540),50,50, imagenes[Math.floor(Math.random() *imagenes.length)]);
             enemigos.push(enemigo1);             
         }        
     function drawEnemigos (){
         enemigos.forEach((enemigo,i) => {
              if(enemigo.x + enemigo.width < 0){
              }
          enemigo.draw(); 
            if(shark.collision (enemigo)){
              enemigos.splice(i,1);
              audiocomer.play();
              puntaje +=20;
              
              console.log("estoy eliminando");
          }                
         });
     }
  // const enemigo2 = new Enemigo(1230,Math.floor(Math.random() * 540), imagenes[Math.floor(Math.random() *imagenes.length)]);    
  //const enemigo1 = new Enemigo(1230,Math.floor(Math.random() * 540), imagenes[Math.floor(Math.random() *imagenes.length)]);

  // Movimiento a todo A Y U D A
// document.addEventListener("mousemove", mouseMoveHandler, false); //// A Y U D A  

// function mouseMoveHandler(e) {
//     var relativeX = e.clientX - canvas.offsetLeft;
//     if(relativeX > 0 && relativeX < canvas.width) {
//       shark.image = relativeX ;
//     }
//}
///F I N   D E   L A   A Y U D A 


function cuadro () { // barra de estado, score y vidas
ctx.beginPath();
ctx.rect(0, 550, 1300, 80);
ctx.fillStyle = "#009786";
ctx.fill();
ctx.closePath();
}

function score() {
    ctx.font = "50px Arial";
    ctx.fillStyle = "#080100";
    ctx.fillText("Score: "+puntaje + " ʕ•ᴥ•ʔ", 50, 600);
}
function vida() {
    ctx.font = "50px Arial";
    ctx.fillStyle = "#0600a0";
    ctx.fillText("Vidas: "+vidas + " ᶘᵒᴥᵒᶅ", 450, 600);
}

function codeGo() {
    ctx.font = "50px Arial" ;
    ctx.fillStyle = "#080100";
    ctx.fillText("Héroe: "+go + "¯(▀̿Ĺ̯▀̿ ̿)", 830, 600);
}

function ganar() {
  clearInterval(interval);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(imagGanar, 0, 0, canvas.width, canvas.height);
  audio.pause();
  audioganaste.play(); 
  
}
function perder (){
  clearInterval(interval);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(imagPerder, 0, 0, canvas.width, canvas.height); 
  audio.pause();
  audiogameover.play();
  audioengame.play();
}

function update() {
   frames ++;    
   background.draw();
   shark.draw();    
  //  enemigo1.draw ();   
   //enemigo2.draw();
  cuadro()
  vida();
  score();
  codeGo();
    generaEnemigo();  
    drawEnemigos();
    generarAsesino();  
    drawAsesino();
    if(vidas===0){
      perder();
    }
    if(puntaje === 450){
      ganar();
      //meter funcion ganar
    }
} 

 function pause() {
    document.location.reload();
 }
 function start() {
     if (interval) return;
     document.querySelector("button").disabled = true;
     audio.play();
     interval = setInterval(update, 1000/60);
   }
  document.querySelector("button").onclick = start;
//setInterval(update,1000/60); Ya.