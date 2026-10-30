const imagenes = [
    {src:"img/imgcarrusel1.jpeg", alt:"img 1"},
    {src:"img/imgcarrusel2.png", alt:"img 2"},
    {src:"img/imgcarrusel3.png", alt:"img 3"}
];
const imagenCarrusel = document.getElementById("img-carrusel"); 
const botonAnterior = document.getElementById("boton-anterior");
const botonSiguiente = document.getElementById("boton-siguiente");

if (imagenCarrusel && botonAnterior && botonSiguiente){
    // Posición de la imagen que se está mostrando
    let posicionActual = 0;

    // Muestra la imagen que corresponde a la posición actual
    function mostrarImagen() {
        imagenCarrusel.src = imagenes[posicionActual].src;
        imagenCarrusel.alt = imagenes[posicionActual].alt;
    }

    botonSiguiente.addEventListener("click", function () {
        posicionActual++;
        if (posicionActual >= imagenes.length) {
            posicionActual = 0;
        }
        mostrarImagen();
    });

    botonAnterior.addEventListener("click", function () {
        posicionActual--;
        if (posicionActual < 0) {
            posicionActual = imagenes.length - 1;
        }
        mostrarImagen();
    });

    mostrarImagen();
}