// Variable del Login
const formulario = document.querySelector('#formulario')

// Vaables del Usuario
const nombreInput = document.querySelector('#nombre');
const apellidoInput = document.querySelector('#apellido')
const emailInput = document.querySelector('#email')
const telefonoInput = document.querySelector('#telefono')
const usuarioInput = document.querySelector('#usuarioRegistro')
const passwordInput = document.querySelector('#passwordRegistro')
const formularioRegistro = document.querySelector('#nuevo-usuario')

let datosUsuario = {
    username: '',
    password: ''
}

let edicion;



document.addEventListener('DOMContentLoaded', () => {
    if (formulario) {
        formulario.addEventListener('submit', iniciarSesion)
    }

    if (window.location.href === 'https://grand-medovik-af3655.netlify.app/usuario') {
        obj = JSON.parse(localStorage.getItem('usuarios')) || [];
        obtenerUsuario()
        eventInputs()
    }

    if (window.location.href === 'https://grand-medovik-af3655.netlify.app/productos') {
        /* obj = JSON.parse(localStorage.getItem('usuarios')) || []; */
        obtenerProductos()
        /* eventInputs() */
    }
})


class Usuario {
    constructor() {
        this.usuario = []
    }

    agregarUsuario(usuario) {
        console.log(usuario);
        this.usuario = [...this.usuario, usuario];
        console.log(this.usuario);
    }

    eliminarUsuario(id) {
        console.log(this.usuario);
        console.log('eliminando', id);
        this.usuario[0] = this.usuario[0].filter(usuario => usuario.id !== id);

    }

    validarUsuario() {
        const url = 'https://fakestoreapi.com/auth/login'

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(datosUsuario),

            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(respuesta => respuesta.json())
            .then(resultado => {

                location.href = 'dashboard.html'

                guardarToken(resultado)
            })
    }
}


class Producto {
    constructor() {
        this.producto = []
    }

    agregarProducto(producto) {
        this.producto = [...this.producto, producto];
    }

    eliminarProducto(id) {
        console.log(this.producto);
        console.log('eliminando', id);
        this.producto[0] = this.producto[0].filter(producto => producto.id !== id);

    }
}



class UI {
    mostrarUsuario(usuarios) {
        const lista = usuarios.usuario[0]

        const contenido = document.querySelector('#usuario .contenido')
        this.limpiarHTML(contenido)

        lista.forEach(usuario => {
            const { id, name: { firstname, lastname }, email } = usuario;

            const row = document.createElement('DIV')
            row.classList.add('row')

            const idDiv = document.createElement('DIV')
            idDiv.classList.add('id')
            idDiv.textContent = id

            const nombreDiv = document.createElement('DIV')
            nombreDiv.classList.add('nombre')
            nombreDiv.textContent = `${firstname} ${lastname}`

            const emailDiv = document.createElement('DIV')
            emailDiv.classList.add('email')
            emailDiv.textContent = email

            const btnVerMas = document.createElement('BUTTON')
            btnVerMas.classList.add('boton')
            btnVerMas.textContent = 'Ver más'

            btnVerMas.onclick = () => cargarEdicion(usuario)


            const btnEliminar = document.createElement('BUTTON')
            btnEliminar.classList.add('boton')
            btnEliminar.textContent = 'Eliminar'

            btnEliminar.onclick = () => eliminarUsuario(id)

            row.appendChild(idDiv)
            row.appendChild(nombreDiv)
            row.appendChild(emailDiv)
            row.appendChild(btnVerMas)
            row.appendChild(btnEliminar)

            contenido.appendChild(row)

        });

        sincronizarStorage(lista);

    }


    mostrarProducto(productos) {
        const lista = productos.producto[0]

        const contenido = document.querySelector('#usuario .contenido')
        this.limpiarHTML(contenido)

        lista.forEach(producto => {
            const { id, title, price, description } = producto;

            const row = document.createElement('DIV')
            row.classList.add('row')

            const idDiv = document.createElement('DIV')
            idDiv.classList.add('id')
            idDiv.textContent = id

            const nombreDiv = document.createElement('DIV')
            nombreDiv.classList.add('nombre')
            nombreDiv.textContent = title

            const emailDiv = document.createElement('DIV')
            emailDiv.classList.add('email')
            emailDiv.textContent = price

            const btnVerMas = document.createElement('BUTTON')
            btnVerMas.classList.add('boton')
            btnVerMas.textContent = 'Ver más'

            /* btnVerMas.onclick = () => cargarEdicion(usuario) */


            const btnEliminar = document.createElement('BUTTON')
            btnEliminar.classList.add('boton')
            btnEliminar.textContent = 'Eliminar'

            btnEliminar.onclick = () => eliminarProducto(id) 

            row.appendChild(idDiv)
            row.appendChild(nombreDiv)
            row.appendChild(emailDiv)
            row.appendChild(btnVerMas)
            row.appendChild(btnEliminar)

            contenido.appendChild(row)

        });

        sincronizarStorage(lista);

    }


    mensajeAlerta(mensaje) {

        const errorMensaje = document.querySelector('.alerta')

        if (!errorMensaje) {
            const divMensaje = document.createElement('DIV')
            divMensaje.textContent = mensaje
            divMensaje.classList.add('alerta')

            formulario.appendChild(divMensaje)

            setTimeout(() => {
                divMensaje.remove()
            }, 3000);
        }
    }

    limpiarHTML(selector) {
        while (selector.firstChild) {
            selector.removeChild(selector.firstChild)
        }
    }

}

const ui = new UI()
const administrarUsuario = new Usuario();
const administrarProducto = new Producto();


function iniciarSesion(e) {
    e.preventDefault()

    const usuario = document.querySelector('#usuario').value
    const password = document.querySelector('#password').value

    if (usuario === '' || password === '') {
        ui.mensajeAlerta('Al menos hay un campo vacio');
        console.log('Al menos hay un campo vacio');
        return
    }

    /* console.log('Iniciando Sesion'); */

    datosUsuario = { username: usuario, password }
    administrarUsuario.validarUsuario();

    // reseteamos los inputs
    datosUsuario = { username: '', password: '' }
    /* console.log(datosUsuario); */
    formulario.reset()
}



function guardarToken(token) {
    console.log(token);

    const guardarLocalStorage = JSON.parse(localStorage.getItem('token')) ?? [];
    localStorage.setItem('token', JSON.stringify([...guardarLocalStorage, token]));
}

// Usuarios
const usuariosObj = {

    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    usuario: '',
    password: ''
}

function obtenerUsuario() {
    const urlUsuarios = 'https://fakestoreapi.com/users';

    fetch(urlUsuarios)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            administrarUsuario.agregarUsuario(resultado)
            ui.mostrarUsuario(administrarUsuario)
        })
}

function obtenerProductos() {
    const urlUsuarios = 'https://fakestoreapi.com/products';

    fetch(urlUsuarios)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            console.log(resultado);
            administrarProducto.agregarProducto(resultado)
            ui.mostrarProducto(administrarProducto)
        })
}


function eventInputs() {
    nombreInput.addEventListener('input', datosInput);
    apellidoInput.addEventListener('input', datosInput);
    emailInput.addEventListener('input', datosInput);
    telefonoInput.addEventListener('input', datosInput);
    usuarioInput.addEventListener('input', datosInput);
    passwordInput.addEventListener('input', datosInput);

    formularioRegistro.addEventListener('submit', agregarUsuario)
}



function datosInput(e) {
    usuariosObj[e.target.name] = e.target.value
    console.log(usuariosObj);
}

function agregarUsuario(e) {
    e.preventDefault()

    const { nombre, apellido, email, telefono, usuario, password } = usuariosObj
    // Aqui validamos los inputs
    const camposVacios = [nombre, apellido, email, telefono, usuario, password].some(campo => campo === '')

    if (camposVacios) {
        console.log('Todos los campos son obligatorios');
        return
    }

    // editar

    // Agregar

    usuariosObj.id = Date.now()

    console.log(usuariosObj);

    administrarUsuario.agregarUsuario({ ...usuariosObj })

    // Despues de cerrar el modo edicion

    formularioRegistro.reset()

    ui.mostrarUsuario(administrarUsuario)

}

function eliminarUsuario(id) {
    administrarUsuario.eliminarUsuario(id)
    ui.mostrarUsuario(administrarUsuario)
}

function eliminarProducto(id) {
    administrarProducto.eliminarProducto(id)
    ui.mostrarProducto(administrarProducto)
}

function sincronizarStorage(update) {
    localStorage.setItem('usuario', JSON.stringify(update));
}



function cargarEdicion(usuario) {
    const { id, name: { firstname, lastname }, email } = usuario;
}