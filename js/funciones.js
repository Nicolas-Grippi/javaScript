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

async function obtenerDatos() {
    try {
        const respuesta = await fetch('data/data.json');
        if (!respuesta.ok) {
            throw new Error('Error en la red');
        }
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        return null;
    }
}

function actualizarReloj() {
    // Obtiene la hora actual del sistema
    const ahora = new Date();
    const opcionesHora = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const opcionesFecha = { year: 'numeric', month: '2-digit', day: '2-digit' };

    const horaActual = ahora.toLocaleTimeString('es-AR', opcionesHora);
    const fechaActual = ahora.toLocaleDateString('es-AR', opcionesFecha);
    const relojElement = document.getElementById('reloj');

    // Actualiza el contenido del reloj
    relojElement.textContent = `Hora: ${horaActual}  Fecha: ${fechaActual}`;

    // Aplica estilos
    relojElement.style.fontSize = '2em';
    relojElement.style.fontWeight = 'bold';
    relojElement.style.color = '#ff5733'; // Color de texto
    relojElement.style.textAlign = 'center'; // Alineación del texto
    relojElement.style.padding = '20px';
    relojElement.style.border = '2px solid #333'; // Borde
    relojElement.style.borderRadius = '10px'; // Bordes redondeados
    relojElement.style.backgroundColor = '#f0f0f0'; // Fondo
    relojElement.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'; // Sombra
    relojElement.style.width = '390px'; // Ajusta el ancho del elemento
    relojElement.style.margin = '0 auto'; // Centra el elemento
}

// Actualiza el reloj cada segundo
setInterval(actualizarReloj, 1000);

// Inicializa el reloj cuando se carga la página
document.addEventListener('DOMContentLoaded', actualizarReloj);