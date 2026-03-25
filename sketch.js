let mirilla;
let pupila;
let esclerotica;

let abierto, medio, cerrado;

let px, py;

// -------------------------
// MIRILLA (toggle)
// -------------------------
let mostrarMirilla = true;

// -------------------------
// PARPADEO
// -------------------------
let estadoParpado = "abierto";
let tiempoCambio = 0;
let parpadeando = false;

let secuencia = ["medio", "cerrado", "medio", "abierto"];
let paso = 0;

function preload() {
    mirilla = loadImage("imagen/mirilla.png");
    pupila = loadImage("imagen/pupila.png");
    esclerotica = loadImage("imagen/esclerotica.png");

    abierto = loadImage("imagen/abierto.png");
    medio = loadImage("imagen/medio.png");
    cerrado = loadImage("imagen/cerrado.png");
}

function setup() {
    createCanvas(800, 800);
    imageMode(CENTER);

    px = width / 2;
    py = height / 2;

    programarParpadeo();
}

function draw() {
    background(0);

    let cx = width / 2;
    let cy = height / 2;

    // -------------------------
    // MOVIMIENTO DE PUPILA
    // -------------------------
    let dx = mouseX - cx;
    let dy = mouseY - cy;

    let distancia = dist(mouseX, mouseY, cx, cy);
    let radio = 45;

    let targetX, targetY;

    if (distancia < radio) {
        targetX = mouseX;
        targetY = mouseY;
    } else {
        let angulo = atan2(dy, dx);
        targetX = cx + cos(angulo) * radio;
        targetY = cy + sin(angulo) * radio;
    }

    // inercia
    px = lerp(px, targetX, 0.15);
    py = lerp(py, targetY, 0.15);

    // -------------------------
    // DIBUJO (orden de capas)
    // -------------------------

    // esclerótica
    image(esclerotica, cx, cy);

    // pupila
    image(pupila, px, py);

    // párpado / rostro
    if (estadoParpado === "abierto") {
        image(abierto, cx, cy);
    } else if (estadoParpado === "medio") {
        image(medio, cx, cy);
    } else if (estadoParpado === "cerrado") {
        image(cerrado, cx, cy);
    }

    // mirilla (condicional)
    if (mostrarMirilla) {
        image(mirilla, cx, cy);
    }

    // -------------------------
    // CONTROL DE PARPADEO
    // -------------------------
    if (millis() > tiempoCambio) {
        if (!parpadeando) {
            parpadeando = true;
            paso = 0;
            tiempoCambio = millis() + 80;
        } else {
            avanzarParpadeo();
        }
    }
}

// -------------------------
// CLICK (toggle mirilla)
// -------------------------
function mousePressed() {
    mostrarMirilla = !mostrarMirilla;
}

// -------------------------
// FUNCIONES DE PARPADEO
// -------------------------

function programarParpadeo() {
    tiempoCambio = millis() + random(3000, 7000);
    parpadeando = false;
    estadoParpado = "abierto";
}

function avanzarParpadeo() {
    estadoParpado = secuencia[paso];
    paso++;

    if (paso >= secuencia.length) {
        paso = 0;
        programarParpadeo();
    } else {
        tiempoCambio = millis() + 80;
    }
}