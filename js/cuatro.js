const canvas = document.getElementById("mycanvas")
canvas.width = "1500";
canvas.height = "685"
const ctx = canvas.getContext('2d');
let basico = 1;
let audio = new Audio();
let interval;
audio.src =
 "https://ia600807.us.archive.org/22/items/DjBabySharkDanceRemix/BabyShark-DjNelzkie.mp3"; 
const imagenes = { // enemigos
    img1: '../images/c++.png',
    img2: '../images/php.png',
    img3: '../images/enemigo 5.png'
  }
// const imagenez = {
//     img1:
// }



class Shark { //se crea clase y función. 
  constructor(width, height) {
    this.x = 0;
    this.y = 0;
    this.width = width; 
    this.height = height; 
    
    this.image1 = new Image(); //nueva imagen
    this.image2 = new Image();
    this.image1.src = "./images/code.png"; //imagen del pajarito
    this.image2.src = "./images/code2.png"; //imagen del pajarito
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
            if (shark.y > canvas.height - 70){
                shark.y = canvas.height - 70
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
            if (shark.x > canvas.width - 70) {
                shark.x = canvas.width - 70 
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
      this.img = new Image()
      this.img.src = img      
    }
    draw() {
      if (this.y > canvas.height) {
        this.y = -100
      }
      this.y++
      ctx.drawImage(this.img, this.x, this.y, 100, 50)
    }
  }
  const enemigo1 = new Enemigo(50, 0, imagenes.img2);

// Movimiento a todo
function update () {
   frames ++;    
   background.draw();
   shark.draw ();  
   enemigo1.draw ();   
}

function start() {
    if (interval) return;
    document.querySelector("button").disabled = true;
    audio.play();
    interval = setInterval(update, 1000 / 60);
  }
  document.querySelector("button").onclick = start;
//setInterval(update,1000/60);