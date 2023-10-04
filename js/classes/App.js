import { iniciarSesion, obtenerUsuario, eventInputs, obtenerProductos, administrarUsuario, eventInputsProducto} from '../funciones.js'
import { formulario } from '../selectores.js'

let obj = administrarUsuario

class App {

    constructor() {
        this.initApp()
    }


    initApp() {
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
                obtenerProductos()
                eventInputsProducto()
            }
        })
    }
}



export default App;