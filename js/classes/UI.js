import { eliminarUsuario, cargarEdicion, sincronizarStorage, eliminarProducto } from '../funciones.js'

class UI {
    mostrarUsuario(usuarios) {

        console.log(usuarios);
        const lista = usuarios.usuario

        const contenido = document.querySelector('#usuario .contenido')
        this.limpiarHTML(contenido)

        lista.forEach(usuarios => {
            const { id, nombre, apellido, email, telefono } = usuarios;

            const row = document.createElement('DIV')
            row.classList.add('row')

            const idDiv = document.createElement('P')
            idDiv.classList.add('id')
            idDiv.innerHTML = `
                <span>ID: </span>${id}
            `
            const nombreDiv = document.createElement('P')
            nombreDiv.classList.add('nombre')
            nombreDiv.innerHTML = `
                <span>Nombre: </span>${nombre} ${apellido}
            `;

            const emailDiv = document.createElement('P')
            emailDiv.classList.add('email')
            emailDiv.innerHTML = `
                <span>Email: </span>${email}
            `
            const telefonoDiv = document.createElement('P')
            telefonoDiv.classList.add('telefono')
            telefonoDiv.innerHTML = `
                <span>Telefono: </span>${telefono}
            `

            const btnVerMas = document.createElement('BUTTON')
            btnVerMas.classList.add('btn', 'btn-editar')
            btnVerMas.textContent = 'Ver más'

            btnVerMas.onclick = () => cargarEdicion(usuarios)


            const btnEliminar = document.createElement('BUTTON')
            btnEliminar.classList.add('btn', 'btn-eliminar')
            btnEliminar.textContent = 'Eliminar'
            
            btnEliminar.onclick = () => eliminarUsuario(id)

            row.appendChild(idDiv)
            row.appendChild(nombreDiv)
            row.appendChild(emailDiv)
            row.appendChild(telefonoDiv)
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

            const idDiv = document.createElement('P')
            idDiv.classList.add('id')
            idDiv.textContent = id

            const nombreDiv = document.createElement('P')
            nombreDiv.classList.add('nombre')
            nombreDiv.textContent =  title;

            const emailDiv = document.createElement('P')
            emailDiv.classList.add('email')
            emailDiv.textContent = price

            const btnVerMas = document.createElement('BUTTON')
            btnVerMas.classList.add('btn', 'btn-editar')
            btnVerMas.textContent = 'Ver más'

            /* btnVerMas.onclick = () => cargarEdicion(usuario) */


            const btnEliminar = document.createElement('BUTTON')
            btnEliminar.classList.add('btn', 'btn-eliminar')
            btnEliminar.textContent = 'Eliminar'

            btnEliminar.onclick = () => eliminarProducto(id)

            row.appendChild(idDiv)
            row.appendChild(nombreDiv)
            row.appendChild(emailDiv)
            row.appendChild(btnVerMas)
            row.appendChild(btnEliminar)

            contenido.appendChild(row)

        });
    }


    mensajeAlerta(mensaje, selector) {

        const errorMensaje = document.querySelector('.alerta')

        if (!errorMensaje) {
            const divMensaje = document.createElement('DIV')
            divMensaje.textContent = mensaje
            divMensaje.classList.add('alerta')

            selector.appendChild(divMensaje)

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


export default UI;