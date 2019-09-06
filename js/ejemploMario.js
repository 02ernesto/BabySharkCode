const canvas = document.getElementById("canvas");// se declara canvas como variable y recoje a canvas como etiqueta de html
const ctx = canvas.getContext("2d");

const mariosImages = {
    first: "https://bit.ly/2L7yH3f",  // imagen mario
    second: "https://bit.ly/2L3ikoe",   // imagen mario 2
    tres: "https://orig00.deviantart.net/8f6e/f/2013/301/4/f/4f6df7f1579cd9567426e2c7e77e601c-d6blgrn.png"
};

class Background { // Clase backgound 
    constructor(x, y, width, height, img) { // posicionamiento e imagen 
        this.x = x; // x
        this.y = y; //y 
        this.width = width; // ancho de canvas
        this.height = height; // alto de canvas
        this.imagen = new Image(); // nueva imagen 
        this.imagen.src = img; // direccion de la imagen de fondo
        //'https://bit.ly/2m9qY9Q' // Imagen de fondo
    }

    draw() {
        // restamos en x para moverlo
        this.x -= 3; // Velocidad de Brackground
        
        if (this.x < -canvas.width) this.x = 0; // en caso de alcanzar el final de la imagen reseteamos x
        ctx.drawImage(this.imagen, this.x, this.y, this.width, this.height);
        
        ctx.drawImage( // dibujamos una segunda imagen al final de la primera
            this.imagen,
            this.x + this.width,
            this.y,
            this.width,
            this.height
        );
    }
}

class Character { //mario
    constructor(x, y, width, height, imgs) { // clase mario 
        this.x = x; // posicion X
        this.y = y; // posicion Y
        this.width = width; // ancho del canvas
        this.height = height; // alto del canvas
        this.image1 = new Image(); // imagen 1 
        this.image2 = new Image(); // imagen 2
        this.image1.src = imgs.first; // selecciona imagen 1 de la matrix imgs
        this.image2.src = imgs.second; // selecciona imagen 2 de la matrix imgs
        this.image = this.image1; // imagen igual a imagen1
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
        if (this.y < 240) this.y += 3; //posicion que toma mario despues del brinco y el numero que lo regresa
        if (frames % 15 === 0) { //Velocidad en que cambia la imagenes de mario entre mas grande el numero mas tarda
            this.image = this.image === this.image1 ? this.image2 : this.image1; // condicion tersaria conjunta las dos imagenes en el mismo lugar
        }
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height); // pinta la imagen 
    }
}

class Enemy { // tortuga 
    constructor() { // empieza el constructor 
        // De principio el enemigo    aparece fuera del canvas
        this.x = canvas.width; // lugar de las X en el ancho del canvas
        // el y del enemigo es el mismo de Mario
        this.y = 255; //Lugar en Y donde aparecen las tortugas
        this.width = 50;// ancho de tortuga
        this.height = 80; // alto de tortuga
        this.image = new Image();
        this.image.src = "https://bit.ly/2upxkWp"; // imagen de tortuga
    }
    draw() {
        //el y del enemigo es el mismo de mario
        if (frames % 10) this.x -= 5 ; // Velocidad de las tortugas
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

const Mario = new Character(100, 241, 90, 100, mariosImages); // cambia de nombre la clase de character, por mario con coordenadas nuevas
//const miniMario = new Character(100, 243, 50, 60, mariosImages);
const background = new Background( // nuevo fondo 
    0, 
    0,
    canvas.width,
    canvas.height,
    'https://bit.ly/2m9qY9Q' // imagen de fondo abarcando todo el ancho y alto del canvas
);


let frames = 0; // variable de movimiento igual a cero 
let interval = setInterval(function () { // 
    // sumamos cada cuadro que dibujamos
    frames++;
    // borramos el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Dibujamos a mario y el background
    background.draw();
    Mario.draw();
    // Generamos enemigos
    generateEnemies();
    drawingEnemies();
}, 1000 / 60); // velocidad en que apareceran enemigos 

addEventListener('keydown', function (event) {
    if (event.keyCode === 32) {
        Mario.y -= 50; //Tamaño del brinco de mario al oprimir barra espaciadora 
    }
    if (event.keyCode === 37) { //se mueve 30 espacios sobre -x 
        Mario.x -= 30;
    }
    if (event.keyCode === 39) { //se mueve 30 espacios sobre +x 
        Mario.x += 30;
    }
});

var enemies = []; // arreglo enemigos empieza en blanco 

function generateEnemies() { // funcion para generar enemigos y meterlos en arreglo
    if (frames % 200 == 0 || frames % 200 == 0 || frames % 170 == 0) { // espacio en el que saldran los enemigos 
        //Aqui creamos a los enemigos

        // Creamos una instancia de Enemy y le argregamos un arreglo
        var enemy = new Enemy();
        enemies.push(enemy); // se van agregando al arreglo enemy 
    }
}

function drawingEnemies() {
    enemies.forEach(function (enemy) { // pinta enemigos con un recorrido de arreglo  enemy 
        enemy.draw();
        // Checaremos colisiones más adelante
        
        if (Mario.collision(enemy)) { // si las colisiones estan en el mismo lugar que enemigo
            
            clearInterval(interval);
            // Ejecutamos Game Over
            ctx.font = "80px Avenir";
            //Dibujamos el texto en el Canvas
            ctx.fillText("Game Over", 350, 190);
        }
    });
}