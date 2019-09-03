canvas = document.getElementById("mycanvas");
ctx = canvas.getContext('2d');

var dif = prompt("Que dificultad deseas:" + "\n" + "-Facil --Oprime 1-- " + "\n" +"-Dificil --Oprime2--");
let x = canvas.width/2;
let y = canvas.height-30;
let velocidad = 1; // :)
let vx = 2; // Velocidad de pelota en x
let vy = -5 ; // Velocidad de pelota en y

let radio = 15 - velocidad;
let discoH = 10;
let discoW = 100;
let discoX = (canvas.width-discoW)/2;
let der = false;
let izq = false;

let ladrilloFila = 4*dif;
let ladrilloColumna = 12;
let ladrilloW = 75;
let ladrilloH = 20;
let ladrilloPading = 5;
let margenTop = 10;
let margenizq = 15;

let puntaje = 0;
let vidas = 3;
                    //0,1--5
let colores = ["red", "black", "yelow", "white", "blue", "green"];
let idColor = Math.floor(Math.random() *colores.length);
console.log('esto es un color?',colores[idColor]);
let ladrillos = []
for(c=0; c<ladrilloColumna; c++) {
    ladrillos[c] = [];
    for(r=0; r<ladrilloFila; r++) {
        ladrillos[c][r] = { x: 0, y: 0, status: 1 };
    }
} 

// audio 
audio.src =
 "https://ia600807.us.archive.org/22/items/DjBabySharkDanceRemix/BabyShark-DjNelzkie.mp3"; 

function bola () { // Dibuja Bola
    ctx.beginPath();
    ctx.arc(x, y, radio, 0, Math.PI*2, false);
    ctx.strokeStyle = "#100098";
    ctx.stroke();    
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

function bolaDentro () { // Delimita para donde pue ir una bola
    if(x + vx > canvas.width-radio || x + vx < radio) {
        vx = -vx;
        console.log("Parte de arriba" +vx)
    }    
    if( y + vy < radio) {
        vy = -vy -0.5;
        console.log("Parte de arriba " +vy)
    }
    if(y + vy > canvas.height-radio){
        if (x > discoX  && x < discoX + discoW) {
            vy = -vy - 0.5 ;
        }
        else { 
            vidas--;
            if(vidas === 0){
                alert("Fuiste Lento :( ");        
                document.location.reload();
            }
            x = canvas.width/2;
            y = canvas.height-30;
            vx = 2;
            vy = -2;
            discoX = (canvas.width-discoW)/2;
        }
    }
    // Disco dentro  y delimita el disco 
    if(der && discoX < canvas.width-discoW) {
        discoX += 7;
    }
    else if(izq && discoX > 0) {
        discoX -= 7;
    }    
}

function disco (){ // dibuja dicos 
    ctx.beginPath();
    ctx.rect(discoX, canvas.height - discoH, discoW, discoH);
    ctx.fillStyle = "#1500e8";
    ctx.fill();
    ctx.closePath();
}

function ladrillo () {     //Dibuja ladrillo  
    for(c=0; c<ladrilloColumna; c++){
        for(r=0;r< ladrilloFila;r++){
           if (ladrillos[c][r].status == 1){
                var ladrilloX = (c*(ladrilloW+ladrilloPading))+margenizq;
                var ladrilloY = (r*(ladrilloH+ladrilloPading))+margenTop;            
                ladrillos[c][r].x = ladrilloX;
                ladrillos[c][r].y = ladrilloY;
                ctx.beginPath();
                ctx.rect(ladrilloX, ladrilloY, ladrilloW, ladrilloH);
                ctx.fillStyle ="#f00000";
                ctx.fill();
                ctx.stroke();    
                ctx.fillStyle = "black";
                ctx.closePath();
           }
        }
    }
}

function draw () { // ejecuta las funcion para pintarlas y darle movimiento 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bola()
    ladrillo ()
    bolaDentro()
    disco ()
    ladrillo ()
    colision()
    score ()
    vida ()
    
    x += vx;
    y +=vy;
}

document.addEventListener("keydown", keyDownHandler, false); // escucha las teclas al oprimirse
document.addEventListener("keyup", keyUpHandler, false); // escucha las teclas al soltarlas

function keyDownHandler(e) { // pequeñas funciones en caso de que su oprima una tecla
    if(e.keyCode == 39) {
        der = true;
    }
    else if(e.keyCode == 37) {
        izq = true;
    }
}

function keyUpHandler(e) { // vuelve a poner el false la tecla al soltarla, para que vuelva a oprimir
    if(e.keyCode == 39) {
        der = false;
    }
    else if(e.keyCode == 37) {
        izq = false;
    }
}
function colision() { // detecta las colisiones
    for(c=0;c<ladrilloColumna;c++){
        for(r=0; r<ladrilloFila;r++){
            var b = ladrillos[c][r];
            if (b.status ==1) {
                if (x > b.x && x < b.x + ladrilloW + radio && y > b.y && y < b.y+ladrilloH + radio){
                    vy = -vy;
                    b.status = 0;
                    puntaje++;
                    
                    if (puntaje== ladrilloFila * ladrilloColumna) {
                        alert("Has Ganado !!Felicidades¡¡, disfruta la imagen");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function score() {
    ctx.font = "100px Arial";
    ctx.fillStyle = "#00f0ed";
    ctx.fillText("Score: "+puntaje + " ▓", 50, 500);
}
function vida() {
    ctx.font = "100px Arial";
    ctx.fillStyle = "#fd05ff";
    ctx.fillText("Vidas: "+vidas, 570, 500);
}
function imagenes (){

}
setInterval(draw,10);