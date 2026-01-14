const camisetas = [
    { id: 1, nombre: "Argentina", precio: 88000, imagen: "argentina.jpg" },
    { id: 2, nombre: "Argentina Titular", precio: 90000, imagen: "argentinatitular.jpg" },
    { id: 3, nombre: "Brasil", precio: 70000, imagen: "brasil.jpg", descuento: true }, 
    { id: 4, nombre: "España", precio: 70000, imagen: "espana.jpg", descuento: true },  
    { id: 5, nombre: "Italia", precio: 65000, imagen: "italia.jpg" },
    { id: 6, nombre: "Portugal", precio: 60000, imagen: "portugal.jpg" },
    { id: 7, nombre: "Colombia", precio: 60000, imagen: "colombia.jpg" }
];

function cargarCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarProducto(id) {
    const producto = camisetas.find(item => item.id == id);
    const carrito = cargarCarrito();
    // Si tiene descuento, calculamos el precio real de venta
    const precioFinal = producto.descuento ? producto.precio * 0.75 : producto.precio;
    
    carrito.push({ ...producto, precio: precioFinal });
    guardarCarrito(carrito);
    recorrerBotonCarrito();
    
    Swal.fire({
        text: `${producto.nombre} agregado al carrito`,
        icon: "success",
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 2000
    });
}

function recorrerBotonCarrito() {
    const badge = document.getElementById("totalCarrito");
    if (badge) badge.innerText = cargarCarrito().length;
}

function guardarProducto(id) {
    localStorage.setItem("producto", JSON.stringify(id));
}

function cargarProducto() {
    let id = JSON.parse(localStorage.getItem("producto"));
    return camisetas.find(item => item.id == id);
}

function actualizarReloj() {
    const ahora = new Date();
    const relojElement = document.getElementById('reloj');
    if (!relojElement) return;
    const hora = ahora.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const fecha = ahora.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' });
    relojElement.innerHTML = `<i class="bi bi-clock me-1"></i> ${hora} | ${fecha}`;
}