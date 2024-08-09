function recorrerCarrito() {
    const carrito = cargarCarrito();
    let contenidoHTML;

    if (totalCamisetas() > 0) {
        contenidoHTML = `<table class="table">
        <tbody>
        <tr>
        <td class="text-end" colspan="4"><button class="btn btn-danger btn-sm" onclick="vaciarCarrito();">Vaciar Carrito <i class="bi bi-trash"></i></button></td>
        </tr>`;

        for (const producto of carrito) {
            if (producto && producto.imagen) {
                contenidoHTML += `<tr>
                <td><img src="images/${producto.imagen}" alt="${producto.nombre}" width="48"></td>
                <td class="align-middle">${producto.nombre}</td>
                <td class="text-center align-middle"><span class="text-danger">$${producto.precio} ARS</span></td>
                <td class="text-end align-middle"><button class="btn btn-danger btn-sm" onclick="eliminarProducto(${producto.id});">Eliminar <i class="bi bi-trash"></i></button></td>
                </tr>`;
            } else {
                console.error('Producto no válido en el carrito:', producto);
            }
        }

        contenidoHTML += `</tbody>
        </table>
        <div class="text-end">
            <button class="btn btn-success btn-lg" onclick="finalizarCompra();">Finalizar Compra <i class="bi bi-check-circle"></i></button>
        </div>`;
    } else {
        contenidoHTML = `<div class="alert alert-dark my-5 text-center" role="alert">
        <h2>❌</h2>
        <h3>No se encontraron Productos en el Carrito!</h3>
        </div>`;
    }
    document.getElementById("contenido").innerHTML = contenidoHTML;
}

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

            window.location.href = "index.html";


            Swal.fire(
                '¡Compra realizada!',
                'Tu compra ha sido finalizada con éxito.',
                'success'
            )
        }
    });
}


recorrerCarrito();
