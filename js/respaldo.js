canvas = document.getElementById("canvas");
ctx = canvas.getContext('2d');
//ctx.fillRect(0,0,50,50); //pequeña prueba de que todo funciona

let frames = 0; //Variable para moviemto
//let gravity = 0.090; //Gravedad del pajarito
let pipes = []; // Objeto donde se meten los obstaculos
let interval;  //intervalo
let score = 0;  //variable de puntaje
let audio = new Audio();  // variable del audio
audio.loop = true;   // Variable de la reproducción continua del audio
audio.src =
 "https://ia600807.us.archive.org/22/items/DjBabySharkDanceRemix/BabyShark-DjNelzkie.mp3"; 
//"https://ia600702.us.archive.org/25/items/FailRecorderMissionImpossibleThemesong/Fail%20Recorder_%20Mission%20Impossible%20Themesong.mp3"; //direccion del audio

class Flappy {  // Clase Flappy , se crea para poner las corrdenadas e imagen del pajarito
  constructor(width, height) { //Constructor se declara adicional a width y height
    this.x = 10;   //Coordenada en X
    this.y = 150;   // Coodenada en Y
    //this.vy = 2;  // avanza 2 en caso de oprimir barra espaciadora  
    //this.userPull = 0;
    this.width = width; // ancho del canvas
    this.height = height; // alto del canvas
    
    // this.image1 = new Image(); // imagen 1 
    // this.image2 = new Image(); // imagen 2
    // this.image1.src = imgs.first; // selecciona imagen 1 de la matrix imgs
    // this.image2.src = imgs.second; // selecciona imagen 2 de la matrix imgs
    // this.image = this.image1; // imagen igual a imagen1
   
    this.image1 = new Image(); //nueva imagen
    this.image2 = new Image(); 
    this.image1.src = "./images/code.png"; //imagen del pajarito
    this.image2.src = "./images/code2.png"; //imagen del pajarito
    this.image = this.image1;
  }

//   reset() { //clase Reset vuelve a su lugar al pajarito
//     this.vy = 2; // avanza 2 
//     this.userPull = 0; // llega a cero
 // }

  collision(item) {  // clase para colisiones, agrega propiedad item para hacer las operaciones
    return ( // regresa 
      this.x < item.x + item.width &&  // Coordenada X menor a  itemX + item ancho canvas
      this.x + this.width > item.x && // X + ancho mayor item X
      this.y < item.y + item.height && // y menor a item alto 
      this.y + this.height > item.y // Y Alto mayor a item Y
    );
  }

  draw() {  // para pintar y ejecutar GAME OVER
    if (frames % 15 !== 0) {
      //debugger; hace un marcaje en el codigo :O
      //Velocidad en que cambia la imagenes de mario entre mas grande el numero mas tarda
        this.image = this.image === this.image1 ? this.image2 : this.image1; // condicion tersaria conjunta las dos imagenes en el mismo lugar
    }
    // if (this.x > 900) { // eje de las x es mayor a 900, 
    //     this.x = 900 // quedate ahi mismo
    //  }
    this.x =170
    
    
    //this.vy = this.vy + (gravity - this.userPull);// se suma gravedad y se resta la posición 0 
    //  if (this.y + this.vy < 0) { // en caso de que Y y alto sea menor a 0 Este fuera de rango. 
    //      this.y = 0; //regresa a Y al punto 0
    //      this.vy = 0; // igual que la posición vy
    //  } else if (this.y + this.height < canvas.height) { // en caso de alto de pase
    //    this.y += this.vy; //se regresa a vy
    //  } else {
      
    //      gameOver(); // se ejecuta funcion GAME OVER
    //  }
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height); //imagen igual a las coordenadas declaradas arriba
  }
  

}

class Background { // se abre otra clase constructor con su pro´pia funcion Draw
  constructor() { // se abre constructor
    this.x = 0; // posición de X en 0 
    this.y = 0; // posición de Y en 0 
    this.width = canvas.width; // posición de ancho igual a lo ancho de canvas
    this.height = canvas.height; //posición de alto igual a lo alto de canvas
    this.image = new Image(); // nueva imagen 
    this.image.src = "./images/fondo3.jpg"; // imagen de fondo
  }

  draw() { // se pinta el fondo 
    this.x--; // X es igual a -1 
    if (this.x < -canvas.width) this.x = 0; // si X es menor al ancho del canvas, se regresa a 0
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height); // se delaran las coordenadas  donde ira la imagen

    ctx.drawImage( // Context se dibuja 
      this.image, // imagen que se agrega
      this.x + canvas.width, // x mas ancho de canvas
      this.y,
      this.width,
      this.height
    ); // se cierra IF
  } // se cierra DRaw
} // se cierra clase Backgrpund

class Pipe { //class tubos enemigos
  constructor(height, pos, y) { // constructor 
    this.x = canvas.width; // posicion X es igual al canvas 
    this.y = y; // posicion Y igual a Y
    this.height = height; // alto igual a alto
    this.width = 60; // ancho igual a 60 
    this.image = new Image(); // una nueva imagen 
    this.image.src = 
      pos === "top" ? "./images/enemigo 5.png" : "./images/yellow.png";// link de la imagen, si variable pos es igual a Top, se pone una imagen y de lo contrario la otra
  }

  draw() {
    this.x--; // se pinta imagen 
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  } // se cierra draw de los enemigos 
} // se cierra clase de los enemigos

const flappy = new Flappy(40, 40); // tamaño de pajarito 
const background = new Background(); // nuevo fondo

function generatePipes() { // Genera enemigos 
  if (!(frames % 200 === 0)) return; // si el residuo de frames entre 200 no es exactamente a 0 , regresa entre menos división mas enemigos
  const height = Math.floor(Math.random() * canvas.height * 0.5 + 30); // aleatoriamente maximo el 0.5 % a tamaño 30 , cerca del 1 pueden aparecer en coordenada 0
  const pipe1 = new Pipe(height, "top", 0); // en la parte superior 
  const pipe2 = new Pipe(canvas.height - height - 140, null, height + 140); // en la parte inferior Alto del canvas, menos height menos 140 si llega a nulo + 140
  pipes.push(pipe1); //inserta en el arreglo un enemigo  arriba
  pipes.push(pipe2); // inserta en el arrelo otro enemigo abajo
}

function drawPipe() { // funcion para pintar enemigo 
  pipes.forEach(pipe => { // recorre el arreglo en un function arrow 
    if (pipe.x + pipe.width < 0) { // si el enemigo en posicion X mas el ancho es menor a 0 (ya paso)
      score += 4; // se suma 2 puntos al score
      pipes.splice(0, 2);// elimina los enemigos
    }
    pipe.draw(); // pinat enemigos 
    if (flappy.collision(pipe)) gameOver(); // si choca imagen de flapy con pipe, ejecuta funcion game over
  }); // se cierra If
} // se cierra funcion Drawpipe

function update() { // se ejecutan las funciones y variables
  frames++; // frames mas 1 
  ctx.font = "35px Arial"; // tamaño y tipo de letra del canvas
  background.draw(); // se ejecuta clase Background
  generatePipes();// se ejecuta generador de enemigos 
  drawPipe(); // se ejecuta pintar enemigos 
  flappy.draw(); // se ejecuta el pajarito
  ctx.fillText(score, 620, 50); // se ejecuta el escore con un relleno en la posicion dicha
}

function gameOver() { // funcion game over 
  document.querySelector("button").disabled = false; // se activa botton 
  audio.pause();  // se detiene musica 
  ctx.fillText("GameOver morro", 235, 200); // se escribe en el canvas Game Over
  clearInterval(interval); // se para el intervalo
  reset(); // se ejecuta funcion reset
  //flappy.reset(); // se reinicia el pajarito a su posicion inicial
}

function reset() { // funcion reset, para reiniciar juego 
  flappy.y = 150; // pajarito en posicion 150
  audio.currentTime = 0; // se hace bucle de musica 
  pipes = []; // se reinicia el arreglo de enemigos
  flappy.userPull = 0; // se pone a cero el pull 
  interval = undefined; // en caso de indefinido
}

function start() { // funcion de empezar el juego 
  if (interval) return; // si interval 
  document.querySelector("button").disabled = true; // se activa boton 
  audio.play(); // se ejecuta audio 
  interval = setInterval(update, 1000 / 60); // velocidad de movimiento
}

document.onkeydown = function(e) { // funcion de teclado 
   if (e.keyCode === 82) { // si se oprime R se ejecuta start 
     start();
   }
   if (e.keyCode == 39) { // si se oprime barra espaciadora 
    Flappy.x = Flappy.x + 10
    Flappy.x = 10 // pajarito se mueve 0.3 izquierda
    //debugger;
    console.log("Me estoy moviendo derecha")
  }
  if (e.keyCode == 37) { // si se oprime barra espaciadora 
    Flappy.x = -10 // pajarito se mueve 0.3 izquierda
    console.log("Me estoy moviendo izquierda")
  }
  if (e.keyCode == 40) { // si se oprime barra espaciadora 
    Flappy.y = -10 // pajarito se mueve 0.3 izquierda
    console.log("Me estoy moviendo abajo")
  }
  if (e.keyCode == 38) { // si se oprime barra espaciadora 
    Flappy.y = 10 // pajarito se mueve 0.3 izquierda
    console.log("Me estoy moviendo arriba")
  }
//     if (e.keyCode == 32) { // si se oprime barra espaciadora 
//       flappy.userPull = this.x + 0.3; // pajarito se mueve 0.3
//     }
//  };

// document.onkeyup = function(e) {  //se baja el pajarito automaticamente al oprimir barra espaciadora 
//     if (e.keyCode == 32) {
//       flappy.userPull = 0;
//     }
 };



document.querySelector("button").onclick = start; // se activa texto start en boton    
