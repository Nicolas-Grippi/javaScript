function recorrerCamisetas() {
    const contenedor = document.getElementById("contenido");
    if (!contenedor) return;

    document.querySelector("#productos h2").innerText = "Nuestras Camisetas";
    let html = "";
    camisetas.forEach(item => {
        html += generarCardHTML(item);
    });
    contenedor.innerHTML = html;
}

function mostrarOutlet() {
    const contenedor = document.getElementById("contenido");
    const productosOutlet = camisetas.filter(item => item.descuento);
    
    document.querySelector("#productos h2").innerText = "Ofertas de Outlet (25% OFF)";
    let html = "";
    productosOutlet.forEach(item => {
        html += generarCardHTML(item);
    });
    
    contenedor.innerHTML = html;
    contenedor.innerHTML += `
        <div class="col-12 text-center mt-4">
            <button class="btn btn-outline-primary" onclick="recorrerCamisetas()">Ver todas las camisetas</button>
        </div>`;
    window.location.hash = "productos";
}

function generarCardHTML(item) {
    const precioMostrar = item.descuento ? item.precio * 0.75 : item.precio;
    return `
    <div class="col-12 col-md-6 col-lg-3">
        <div class="card h-100 shadow-sm border-0 position-relative">
            ${item.descuento ? '<span class="badge bg-danger position-absolute top-0 start-0 m-2 shadow">25% OFF</span>' : ''}
            <a href="producto.html" onclick="guardarProducto(${item.id});">
                <img src="images/${item.imagen}" class="card-img-top p-3" alt="${item.nombre}" onerror="this.src='./images/logoafa.png'">
            </a>
            <div class="card-body text-center d-flex flex-column">
                <h5 class="card-title fw-bold">${item.nombre}</h5>
                <p class="card-text mb-1 ${item.descuento ? 'text-decoration-line-through text-muted small' : 'text-primary fw-bold fs-5'}">
                    $${item.precio.toLocaleString('es-AR')}
                </p>
                ${item.descuento ? `<p class="card-text text-danger fw-bold fs-5">$${precioMostrar.toLocaleString('es-AR')}</p>` : ''}
                <button class="btn btn-dark fw-bold mt-auto" onclick="agregarProducto(${item.id})">
                    <i class="bi bi-cart-plus me-1"></i> Comprar
                </button>
            </div>
        </div>
    </div>`;
}

document.addEventListener('DOMContentLoaded', () => {
    recorrerCamisetas();
    recorrerCarrito();
    actualizarReloj();
    setInterval(actualizarReloj, 1000);
});