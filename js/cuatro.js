const canvas = document.getElementById("mycanvas")
canvas.width = "1300";
canvas.height = "600"
const ctx = canvas.getContext('2d');
let basico = 1;
let vx = 2; // Velocidad  x
let vy = -5 ; // Velocidad  y
let audio = new Audio();
enemigos =[];
let puntaje = 0;
let vidas = 3;
let go = 200
let interval;
audio.src =
 "https://ia600807.us.archive.org/22/items/DjBabySharkDanceRemix/BabyShark-DjNelzkie.mp3"; 
let img1 = './images/c++.png'; var img2 = './images/php.png'; var img3 = './images/enemigo 5.png' ;
imagenes = [img1,img2,img3]; 

  

class Shark { //se crea clase y función. 
  constructor(width, height) {
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
  collision(item) { //colision
    return (
      // regresa
      this.x < item.x + item.width && // Coordenada X menor a  itemX + item ancho canvas
      this.x + this.width > item.x && // X + ancho mayor item X
      this.y < item.y + item.height && // y menor a item alto
      this.y + this.height > item.y // Y Alto mayor a item Y
    );
  }
 
   draw() {    
    if (frames % 15 !== 0) {
            this.image = this.image === this.image1 ? this.image2 : this.image1; // si imagen 1, entonces pasa a imagen 2 y viceversa
    }
    document.onkeydown = function(e) {
        if (e.keyCode === 82) {
            start();
          }
        if (e.keyCode === 40) {        
            if (shark.y > canvas.height - 50){
                shark.y = canvas.height - 50
            }
            shark.y += 5;        
        }       
        if (e.keyCode == 38) {
            if (shark.y < 5){
                shark.y =5
            }
            shark.y -= 5;               
         }
        if (e.keyCode == 37) {
            if (shark.x < 5){
                shark.x=5
            }
            shark.x -= 5;        
          }
        if (e.keyCode == 39) {
            if (shark.x > canvas.width - 50) {
                shark.x = canvas.width - 50 
            }
            shark.x += 5;
          }   
      }; 


    ctx.drawImage(this.image,this.x, this.y, this.width, this.height); // Pinta a Shark
    }     
}
 
  
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

const shark = new Shark(60, 60); //Se crea instancia del constructor de Shark
const background = new Background(); // Instancia del fondo

class Enemigo {// Enemigos
    constructor(x, y, img) { 
      this.x = x 
      this.y = y
      
      this.image = new Image()
      this.image.src = img      
    }
    draw() {
        if (this.y > canvas.height - 90){//abajo            
            vy = -vy;           
        }
        if (this.y < 5){//arriba            
            vy = -vy;           
        }          
        if (this.x < 5){ //izquierdo            
            vx = -vx 
        }       
        if (this.x > canvas.width - 60) { //Derecho
            vx = -vx             
        }    
      this.x += vx;
      this.y +=vy;
      //this.y++
      ctx.drawImage(this.image, this.x, this.y, 50, 80)
    }    
  }
  

  //    function generaEnemigo() {
    //        if (!(frames % 200 === 0)) return;
    //        const height = Math.floor(Math.random() * canvas.height * 0.5 + 30);
    //        const pipe1 = new Pipe(height, "top", 0);
    //        const pipe2 = new Pipe(canvas.height - height - 140, null, height + 140);
    //        pipes.push(pipe1);
    //        pipes.push(pipe2);
    //      }
    
    
    //const enemigo1 = new Enemigo(1230,Math.floor(Math.random() * 540), imagenes.img3);
    
    
    const enemigo1 = new Enemigo(1230,Math.floor(Math.random() * 540), imagenes[Math.floor(Math.random() *imagenes.length)]);
  //const enemigo2 = new Enemigo(1230,Math.floor(Math.random() * 540), imagenes[Math.floor(Math.random() *imagenes.length)]);

       // if (flappy.collision(pipe)) gameOver();
    //}
    //   const enemy = new Enemy (imgEnemy[imgPosition],pos,width,height,damage)
//   enemies.push(enemy);
        
    // class Pipe {
    //     constructor(height, pos, y) {
    //       this.x = canvas.width;
    //       this.y = y;
    //       this.height = height;
    //       this.width = 60;
    //       this.image = new Image();
    //       this.image.src =
    //         pos === "top" ? "images/obstacle_top.png" : "images/obstacle_bottom.png";
    //     }
      
    //     draw() {
    //       this.x--;
    //       ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    //     }
    //   }
      
    //      function generatePipes() {
    //        if (!(frames % 200 === 0)) return;
    //        const height = Math.floor(Math.random() * canvas.height * 0.5 + 30);
    //        const pipe1 = new Pipe(height, "top", 0);
    //        const pipe2 = new Pipe(canvas.height - height - 140, null, height + 140);
    //        pipes.push(pipe1);
    //        pipes.push(pipe2);
    //      }
        
    //      function drawPipe() {
    //        pipes.forEach(pipe => {
    //          if (pipe.x + pipe.width < 0) {
    //            score += 2;
    //            pipes.splice(0, 2);
    //          }
    //          pipe.draw();
    //          if (flappy.collision(pipe)) gameOver();
    //        });
    //      }
      
     
    //   function update() {
    //     frames++;
    //     ctx.font = "35px Arial";
    //     background.draw();
    //     generatePipes();
    //     drawPipe();
    //     flappy.draw();
    //     ctx.fillText(score, 620, 50);
    //   }


// Movimiento a todo
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
    ctx.font = "50px Arial";
    ctx.fillStyle = "#080100";
    ctx.fillText("Héroe: "+go + "¯(▀̿Ĺ̯▀̿ ̿)", 830, 600);
}

function update () {
   frames ++;    
   background.draw();
   shark.draw ();    
   enemigo1.draw ();   
  // enemigo2.draw();
  cuadro ()
  vida ();
  score ();
  codeGo ();
}

 function start() {
     if (interval) return;
     document.querySelector("button").disabled = true;
     audio.play();
     interval = setInterval(update, 1000 / 60);
   }
  document.querySelector("button").onclick = start;
//setInterval(update,1000/60);