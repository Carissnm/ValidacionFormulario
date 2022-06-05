// Variables
const botonBorrar = document.querySelector('#borrar');
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const botonEnviar = document.querySelector('#enviar');
const formulario = document.querySelector('#enviar-mail')



// Event Listeners
eventListeners();

function eventListeners() {
    //cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //campos formulario
    //validacion email
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);
    formulario.addEventListener('submit', enviarEmail);
    botonBorrar.addEventListener('click', borrarFormulario);
}


// Funciones
function iniciarApp() {
    botonEnviar.disabled = true;
    
}

function borrarFormulario() {
    formulario.reset();

    const error = document.querySelector('p.error');
            if(error) {
                error.remove();
            }
            
    iniciarApp();
    email.classList.remove('borde-rojo', 'borde-verde');
    asunto.classList.remove('borde-rojo', 'borde-verde');
    mensaje.classList.remove('borde-rojo', 'borde-verde');
};


function validarFormulario(e) {

    const clases = e.target.classList;
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;

    if(e.target.value.length > 0) {
        const error = document.querySelector('p.error');
        if(error) {
            error.remove();
        }
        

        clases.remove('borde-rojo');
        clases.add('borde-verde');
    } else {
        clases.remove('borde-verde');
        clases.add('borde-rojo');

        mostrarError("Todos los campos son obligatorios");
    }

    if(e.target.type === 'email') {
        if(regEx.test( e.target.value )) {
            const error = document.querySelector('p.error');
            if(error) {
                error.remove();
            }
            
            clases.remove('borde-rojo');
            clases.add('borde-verde');
        } else {
            clases.remove('borde-verde');
            clases.add('borde-rojo');

            botonEnviar.disabled = true;

            mostrarError('Email no válido');
        }
    }

    if(regEx.test( email.value ) && asunto.value !== '' && mensaje.value !== '') {
        console.log('Pasaste la validacion');
        botonEnviar.disabled = false;
    }
    
}

function mostrarError(mensaje){
    const mensajeError = document.createElement('p')
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('parrafo-error', 'error');

    const errores2 = document.querySelectorAll('.error');

    if(errores2.length == 0) {
        formulario.appendChild(mensajeError);
    } 
    
}


function enviarEmail(e) {
    e.preventDefault();
    //Mostrar el spinner 
    const spinner = document.querySelector('#container');
    spinner.style.display = 'flex';

    // Después de 3 seg ocultar spinner y mostrar mensaje exitoso
    setTimeout(() => {
        spinner.style.display = 'none';

        //Mensaje 
        const parrafo = document.createElement('p');
        parrafo.classList.add('parrafo-exito')
        parrafo.textContent = "¡Mensaje enviado correctamente!";
        formulario.insertBefore(parrafo, spinner);

        setTimeout(() => {
            parrafo.remove();
            borrarFormulario();
        }, 5000)
    }, 3000);
};




