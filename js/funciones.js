import UI from './classes/UI.js';
import Usuario from './classes/Usuario.js'
import Producto from './classes/Producto.js'
import { nombreInput, apellidoInput, emailInput, telefonoInput, usuarioInput, passwordInput, formularioRegistro, refrescar, formulario, precioInput, tituloInput, img, descripcion, nombreProductoInput, formularioProducto } from './selectores.js'


const ui = new UI()
export const administrarUsuario = new Usuario();
export const administrarProducto = new Producto();
let editando;

export let datosUsuario = {
    username: '',
    password: ''
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

function reiniciarObjeto() {
    usuariosObj.nombre = '',
    usuariosObj.apellido = '',
    usuariosObj.email = '',
    usuariosObj.telefono = '',
    usuariosObj.usuario = '',
    usuariosObj.password = ''
}

const productosObj = {
    nombre: '',
    precio: '',
    titulo: '',
    img: '',
    descripcion: ''

}

if (refrescar) {
    refrescar.addEventListener('click', () => {
        location.reload()
    })
}


export function iniciarSesion(e) {
    e.preventDefault()

    const usuario = document.querySelector('#usuario').value
    const password = document.querySelector('#password').value

    if (usuario === '' || password === '') {
        ui.mensajeAlerta('Al menos hay un campo vacio', formulario);
        console.log('Al menos hay un campo vacio');
        return
    }

    /* console.log('Iniciando Sesion'); */

    datosUsuario = { username: usuario, password }
    administrarUsuario.validarUsuario(datosUsuario);

    // reseteamos los inputs
    datosUsuario = { username: '', password: '' }
    /* console.log(datosUsuario); */
    formulario.reset()
}




export function guardarToken(token) {
    console.log(token);

    const guardarLocalStorage = JSON.parse(localStorage.getItem('token')) ?? [];
    localStorage.setItem('token', JSON.stringify([...guardarLocalStorage, token]));
}


export function eventInputs() {
    nombreInput.addEventListener('input', datosInput);
    apellidoInput.addEventListener('input', datosInput);
    emailInput.addEventListener('input', datosInput);
    telefonoInput.addEventListener('input', datosInput);
    usuarioInput.addEventListener('input', datosInput);
    passwordInput.addEventListener('input', datosInput);

    formularioRegistro.addEventListener('submit', agregarUsuario)
}


export function eventInputsProducto() {
    nombreProductoInput.addEventListener('input', datosInputProductos);
    precioInput.addEventListener('input', datosInputProductos);
    tituloInput.addEventListener('input', datosInputProductos);
    img.addEventListener('input', datosInputProductos);
    descripcion.addEventListener('input', datosInputProductos);

    //formularioProducto.addEventListener('submit', agregarUsuario)
}

function datosInputProductos(e) {
    productosObj[e.target.name] = e.target.value
    console.log(productosObj);
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
        ui.mensajeAlerta('Todos los campos son obligatorios', formularioRegistro);
        return
    }

    if (editando) {

        // Editando
        ui.mensajeAlerta('Editado Correctamente', formularioRegistro)
        administrarUsuario.editarUsuario({ ...usuariosObj })
        formularioRegistro.querySelector('button[type="submit"').textContent = 'Crear Usuario'

        editando = false
    } else {

        // Agregar
        usuariosObj.id = Date.now()
        administrarUsuario.agregarUsuario({ ...usuariosObj })
        ui.mensajeAlerta('Agregado Correctamente', formularioRegistro)
    }

    reiniciarObjeto();
    formularioRegistro.reset()
    ui.mostrarUsuario(administrarUsuario)

}




export function eliminarUsuario(id) {
    administrarUsuario.eliminarUsuario(id)
    ui.mostrarUsuario(administrarUsuario)
}

export function eliminarProducto(id) {
    administrarProducto.eliminarProducto(id)
    ui.mostrarProducto(administrarProducto)
}

export function sincronizarStorage(update) {
    localStorage.setItem('usuario', JSON.stringify(update));
}



export function cargarEdicion(usuarios) {
    //const { id, name: { firstname, lastname }, email } = usuario;
    const { id, nombre, apellido, email, telefono, usuario, password } = usuarios

    nombreInput.value = nombre
    apellidoInput.value = apellido
    emailInput.value = email
    telefonoInput.value = telefono
    usuarioInput.value = usuario
    passwordInput.value = password


    usuariosObj.nombre = nombre
    usuariosObj.apellido = apellido
    usuariosObj.email = email
    usuariosObj.telefono = telefono
    usuariosObj.usuario = usuario
    usuariosObj.password = password
    usuariosObj.id = id

    formularioRegistro.querySelector('button[type="submit"').textContent = 'Guardar Cambios'
    editando = true

}

export function obtenerUsuario() {
    const urlUsuarios = 'https://fakestoreapi.com/users';

    fetch(urlUsuarios)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            /* console.log(resultado); */
            /* administrarUsuario.agregarUsuario(resultado)
            ui.mostrarUsuario(administrarUsuario) */
            prueba(resultado)
        })
}


function prueba(usuarios) {

    usuarios.forEach(usuario => {
        const { id, name: { firstname, lastname }, email, phone, username, password } = usuario;

        /* console.log(firstname); */

        usuariosObj.nombre = firstname
        usuariosObj.apellido = lastname
        usuariosObj.email = email
        usuariosObj.telefono = phone
        usuariosObj.usuario = username
        usuariosObj.password = password
        usuariosObj.id = id



        administrarUsuario.agregarUsuario({ ...usuariosObj })
        reiniciarObjeto()
        ui.mostrarUsuario(administrarUsuario)
    });
}

export function obtenerProductos() {
    const urlUsuarios = 'https://fakestoreapi.com/products';

    fetch(urlUsuarios)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            console.log(resultado);
            administrarProducto.agregarProducto(resultado)
            ui.mostrarProducto(administrarProducto)
        })
}