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


export default Producto