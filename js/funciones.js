const camisetas = [
    { id: 1, nombre: "Argentina", precio: 88000, imagen: "argentina.jpg"  },
    { id: 2, nombre: "Argentina Titular", precio: 90000, imagen:"argentinatitular.jpg"  },
    { id: 3, nombre: "Argentina Entrenamiento", precio: 60000, imagen: "argentrenamiento.jpg" },
    { id: 4, nombre: "Brasil", precio: 70000, imagen:"brasil.jpg" },
    { id: 5, nombre: "España", precio: 70000, imagen: "espana.jpg" },
    { id: 6, nombre: "Italia", precio: 65000, imagen: "italia.jpg"},
    { id: 7, nombre: "Portugal", precio: 60000, imagen: "portugal.jpg" },
    { id: 8, nombre: "Colombia", precio: 60000, imagen: "colombia.jpg" } 
]


function agregarProducto(id) { 
    const producto = camisetas.find(item => item.id == id);
    const carrito = cargarCarrito();
    carrito.push(producto);
    guardarCarrito(carrito);
    recorrerBotonCarrito();
    alert("El producto #" + id + " se ha agregado correctamente!");
}

function eliminarProducto(id) {
    const carrito = cargarCarrito();
    const carritoActualizado = carrito.filter(item => item.id != id);
    guardarCarrito(carritoActualizado);
    recorrerCarrito();
    recorrerBotonCarrito();
    alert("El producto #" + id + " se ha eliminado correctamente!");
}

function recorrerBotonCarrito() {
    let total = totalCamisetas();
    document.getElementById("totalCarrito").innerHTML = total;
}

function totalCamisetas() {
    const carrito = cargarCarrito();

    return carrito.length;
}

function cargarCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function vaciarCarrito() {
    localStorage.removeItem("carrito");
    recorrerCarrito();
    recorrerBotonCarrito();
    alert("El carrito se ha vaciado correctamente!");
}

function cargarProducto() {
    let id = JSON.parse(localStorage.getItem("producto"));
    const producto = camisetas.find(item => item.id == id);

    return producto;
}

function guardarProducto(id) {
    localStorage.setItem("producto", JSON.stringify(id));
}