import {guardarToken} from '../funciones.js'

class Usuario {
    constructor() {
        this.usuario = []
    }

    agregarUsuario(usuario) {
        //console.log(usuario);
        this.usuario = [...this.usuario, usuario];
        //console.log(this.usuario);
    }

    eliminarUsuario(id) {
        console.log(this.usuario);
        console.log('eliminando', id);
        this.usuario = this.usuario.filter(usuario => usuario.id !== id);

    }

    editarUsuario(usuarioActualizado) {
        this.usuario = this.usuario.map( usuario => usuario.id === usuarioActualizado.id ? usuarioActualizado : usuario)
    }

    validarUsuario(datosUsuario) {
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


export default Usuario;