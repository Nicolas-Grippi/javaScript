// Esta función reemplaza la lógica de totalCamisetas() que no tenías
function recorrerCarrito() {
    const carrito = cargarCarrito();
    const contenedor = document.getElementById("contenido");
    if (!contenedor) return;

    let contenidoHTML = "";

    // Usamos carrito.length que es lo estándar de JavaScript
    if (carrito.length > 0) {
        contenidoHTML = `
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <td class="text-end" colspan="4">
                            <button class="btn btn-danger btn-sm" onclick="vaciarCarrito();">
                                Vaciar Carrito <i class="bi bi-trash"></i>
                            </button>
                        </td>
                    </tr>
                </thead>
                <tbody>`;

        let totalPagar = 0;

        for (const producto of carrito) {
            totalPagar += producto.precio;
            contenidoHTML += `
                <tr>
                    <td><img src="images/${producto.imagen}" alt="${producto.nombre}" width="48"></td>
                    <td class="align-middle">${producto.nombre}</td>
                    <td class="text-center align-middle"><span class="text-danger">$${producto.precio.toLocaleString('es-AR')} ARS</span></td>
                    <td class="text-end align-middle">
                        <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${producto.id});">
                            Eliminar <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>`;
        }

        contenidoHTML += `
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="2" class="fw-bold">Total a Pagar:</td>
                        <td class="text-center fw-bold text-danger">$${totalPagar.toLocaleString('es-AR')} ARS</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </div>
        <div class="text-end my-4">
            <button class="btn btn-success btn-lg" onclick="finalizarCompra();">
                Finalizar Compra <i class="bi bi-check-circle"></i>
            </button>
        </div>`;
    } else {
        contenidoHTML = `
        <div class="alert alert-dark my-5 text-center" role="alert">
            <h2>❌</h2>
            <h3>No se encontraron Productos en el Carrito!</h3>
            <a href="index.html" class="btn btn-primary mt-3">Ir a comprar</a>
        </div>`;
    }
    
    contenedor.innerHTML = contenidoHTML;
}

// FUNCIÓN PARA ELIMINAR UN PRODUCTO
function eliminarProducto(id) {
    let carrito = cargarCarrito();
    // Buscamos el índice del primer producto que coincida con el ID
    const index = carrito.findIndex(item => item.id == id);
    
    if (index !== -1) {
        carrito.splice(index, 1); // Borra solo uno
        guardarCarrito(carrito);
        recorrerCarrito(); // Refresca la tabla
        recorrerBotonCarrito(); // Refresca el numerito del icono
    }
}

// FUNCIÓN PARA VACIAR TODO EL CARRITO
function vaciarCarrito() {
    localStorage.removeItem("carrito");
    recorrerCarrito();
    recorrerBotonCarrito();
}

// FUNCIÓN PARA FINALIZAR COMPRA
function finalizarCompra() {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¿Quieres finalizar la compra?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, finalizar compra!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("carrito"); // Borramos datos
            
            Swal.fire(
                '¡Compra realizada!',
                'Tu compra ha sido finalizada con éxito.',
                'success'
            ).then(() => {
                window.location.href = "index.html"; // Redirigimos después del OK
            });
        }
    });
}

// Ejecución inicial al cargar la página del carrito
document.addEventListener('DOMContentLoaded', () => {
    recorrerCarrito();
    recorrerBotonCarrito();
});