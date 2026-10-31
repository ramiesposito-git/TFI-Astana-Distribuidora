//Carrusel
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

// --------------------------------------------------------------------------------------------------------------------
// Formulario de contacto
const formulario = document.getElementById("form-contacto");

if(formulario){
    //Desactiva las validaciones automaticas del navegador, para que la validacion lo haga este script
    formulario.noValidate = true;

    const campoNombre = document.getElementById("nombre");
    const campoMail = document.getElementById("mail");
    const campoTelefono = document.getElementById("telefono");
    const campoMensaje = document.getElementById("mensaje");

    //Expresion regular del nombre letras con tildes y ñ, apostrofe, guion y espacios, entre 3 y 60 caracters
    const regexNombre = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' -]{3,60}$/;
    //Expresion regular del mail texto + el @ + texto + . + texto, sin espacios
    const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    //Expresion regular del telefono puede empezar con +, tener solo digitos, espacios, guiones y paréntesis
    const regexTelefono = /^\+?[\d\s()-]+$/;

    function mostrarError(campo, mensaje){
        let parrafo = document.getElementById("error-" + campo.id);

        if (!parrafo) {
            parrafo = document.createElement("p");
            parrafo.id = "error-" + campo.id;
            parrafo.className = "error";
            campo.insertAdjacentElement("afterend", parrafo);
        }

        parrafo.textContent = mensaje;
        campo.classList.add("invalido");
    }

    function limpiarError(campo) {
        const parrafo = document.getElementById("error-" + campo.id);

        if (parrafo) {
            parrafo.textContent = "";
        }
        campo.classList.remove("invalido");
    }

    function validarNombre() {
        const valor = campoNombre.value.trim();

        if (valor === "") {
            mostrarError(campoNombre, "El nombre y apellido es obligatorio.");
            return false;
        }
        if (!regexNombre.test(valor)) {
            mostrarError(campoNombre, "Ingresa entre 3 y 60 letras, sin numeros ni simbolos.");
            return false;
        }
        limpiarError(campoNombre);
        return true;
    }

    function validarMail() {
        const valor = campoMail.value.trim();

        if (valor === "") {
            mostrarError(campoMail, "El correo electronico es obligatorio.");
            return false;
        }
        if (!regexMail.test(valor)) {
            mostrarError(campoMail, "Ingresa un correo valido, por ejemplo nombre@dominio.com.");
            return false;
        }
        limpiarError(campoMail);
        return true;
    }

    function validarTelefono() {
        const valor = campoTelefono.value.trim();

        if (valor === "") {
            mostrarError(campoTelefono, "El telefono es obligatorio.");
            return false;
        }
        const soloDigitos = valor.replace(/\D/g, "");

        if (!regexTelefono.test(valor) || soloDigitos.length < 8 || soloDigitos.length > 13) {
            mostrarError(campoTelefono, "Ingresa un telefono valido, de 8 a 13 digitos (puede llevar +, espacios o guiones).");
            return false;
        }
        limpiarError(campoTelefono);
        return true;
    }

    function validarMensaje() {
        const valor = campoMensaje.value.trim();

        if (valor === "") {
            mostrarError(campoMensaje, "El mensaje es obligatorio.");
            return false;
        }
        if (valor.length < 10) {
            mostrarError(campoMensaje, "El mensaje debe tener al menos 10 caracteres.");
            return false;
        }
        limpiarError(campoMensaje);
        return true;
    }

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();
        
        //Se validan todos los campos 
        const nombre = validarNombre();
        const mail = validarMail();
        const telefono = validarTelefono();
        const mensaje = validarMensaje();

        if (nombre && mail && telefono && mensaje) {
            formulario.reset();
        } else {
            //Lleva el cursor al primer campo con error
            const primerError = formulario.querySelector(".invalido");
            if (primerError) {
                primerError.focus();
            }
        }
    });
}