const camisetas = [
    { id: 1, nombre: "Argentina", precio: 88000, imagen: "argentina.jpg" },
    { id: 2, nombre: "Argentina Titular", precio: 90000, imagen: "argentinatitular.jpg" },
    { id: 3, nombre: "Argentina Entrenamiento", precio: 60000, imagen: "argentrenamiento.jpg" },
    { id: 4, nombre: "Brasil", precio: 70000, imagen: "brasil.jpg" },
    { id: 5, nombre: "España", precio: 70000, imagen: "espana.jpg" },
    { id: 6, nombre: "Italia", precio: 65000, imagen: "italia.jpg" },
    { id: 7, nombre: "Portugal", precio: 60000, imagen: "portugal.jpg" },
    { id: 8, nombre: "Colombia", precio: 60000, imagen: "colombia.jpg" }
]


function agregarProducto(id) {
    const producto = camisetas.find(item => item.id == id);
    const carrito = cargarCarrito();
    carrito.push(producto);
    guardarCarrito(carrito);
    recorrerBotonCarrito();
    Swal.fire({
        position: "bottom",
        icon: "success",
        title: "El producto #" + id + " se ha agregado correctamente!",
        showConfirmButton: false,
        timer: 1500,
        width: "440px",
        heightAuto: false
    });

}

function eliminarProducto(id) {
    const carrito = cargarCarrito();
    const index = carrito.findIndex(item => item.id === id);
    
    if (index !== -1) {
        carrito.splice(index, 1); 
        guardarCarrito(carrito);
        recorrerCarrito();
        recorrerBotonCarrito();

        Swal.fire({
            title: "Esta seguro que desea eliminar el producto?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "No, cancelar",
            confirmButtonText: "Si, eliminarlo"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Eliminado",
                    text: "El producto ha sido eliminado correctamente!",
                    icon: "success"
                });
            }
        });
    } else {
        Swal.fire({
            title: "Error",
            text: "El producto no se encontró en el carrito.",
            icon: "error"
        });
    }
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
    Swal.fire({
        position: "bottom",
        icon: "error",
        title: "El carrito se ha vaciado correctamente!",
        showConfirmButton: false,
        timer: 1500,
        width: "440px",
        heightAuto: false
    });

}

function cargarProducto() {
    let id = JSON.parse(localStorage.getItem("producto"));
    const producto = camisetas.find(item => item.id == id);

    return producto;
}

function guardarProducto(id) {
    localStorage.setItem("producto", JSON.stringify(id));
}


//Aca elegi este consumo de API externa la cual me da la hora en tiempo real
async function obtenerHora() {
    try {
        const respuesta = await fetch('https://worldtimeapi.org/api/timezone/America/Argentina/Buenos_Aires');
        const datos = await respuesta.json();
        const dateTime = new Date(datos.datetime);
        const horas = dateTime.getHours().toString().padStart(2, '0');
        const minutos = dateTime.getMinutes().toString().padStart(2, '0');
        const segundos = dateTime.getSeconds().toString().padStart(2, '0');
        document.getElementById('reloj').textContent = `${horas}:${minutos}:${segundos}`;
    } catch (error) {
        console.error('Error al obtener la hora:', error);
        document.getElementById('reloj').textContent = 'Error al obtener la hora';
    }
}

function actualizarReloj() {
    obtenerHora();
    setInterval(obtenerHora, 1000); 
}
document.addEventListener('DOMContentLoaded', (event) => {
    const reloj = document.getElementById('reloj');
    const container = document.getElementById('reloj-container');

   
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';
    container.style.height = '80px';

    reloj.style.fontSize = '2em';
    reloj.style.fontWeight = 'bold';
    reloj.style.margin = '20px';
    reloj.style.padding = '10px 50px';
    reloj.style.border = '2px solid #000';
    reloj.style.borderRadius = '10px';
    reloj.style.backgroundColor = '#f0f0f0';
    reloj.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.1)';

    actualizarReloj(); 
});