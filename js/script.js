//Carrusel
const imagenes = [
    {src:"img/presentacion-astana.jpeg", alt:"Presentacion de Distribuidora Astana"},
    {src:"img/representante-canber.png", alt:"Representante de Canber"},
    {src:"img/representante-fedar.jpeg", alt:"Representante de Fedar"},
    {src:"img/catalogo-astana.png", alt:"Catalogo de Astana"}
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

    function mostrarResumen(nombre, mail, telefono, mensaje) {
        let resumen = document.getElementById("resumen");

        //Si en el html de contacto no tiene el contenedor del resumen, se crea al lado del formulario
        if (!resumen) {
            resumen = document.createElement("div");
            resumen.id = "resumen";
            resumen.className = "resumen";
            formulario.insertAdjacentElement("afterend", resumen);
        }

        //Se vacia por si habia un resumen anterior
        resumen.replaceChildren();

        const titulo = document.createElement("h2");
        titulo.textContent = "¡Gracias por tu consulta!";
        resumen.appendChild(titulo);

        const intro = document.createElement("p");
        intro.textContent = "Estos son los datos que enviaste:";
        resumen.appendChild(intro);

        const pNombre = document.createElement("p");
        pNombre.textContent = "Nombre y Apellido: " + nombre;
        resumen.appendChild(pNombre);

        const pMail = document.createElement("p");
        pMail.textContent = "Correo electronico: " + mail;
        resumen.appendChild(pMail);

        const pTelefono = document.createElement("p");
        pTelefono.textContent = "Telefono: " + telefono;
        resumen.appendChild(pTelefono);

        const pMensaje = document.createElement("p");
        pMensaje.textContent = "Mensaje: " + mensaje;
        resumen.appendChild(pMensaje);
    }

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();
        
        //Se validan todos los campos 
        const nombre = validarNombre();
        const mail = validarMail();
        const telefono = validarTelefono();
        const mensaje = validarMensaje();

        if (nombre && mail && telefono && mensaje) {
            mostrarResumen(campoNombre.value.trim(),
            campoMail.value.trim(),
            campoTelefono.value.trim(),
            campoMensaje.value.trim()
        );
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