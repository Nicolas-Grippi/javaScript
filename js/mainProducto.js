function recorrerProducto() {
    const producto = cargarProducto();
    let htmlImagenProducto = `<img src="images/${producto.imagen}" class="img-fluid" alt=${producto.nombre} />`;
    let htmlDetalleProducto = `<h1>${producto.nombre}</h1>
    <p class="text-danger fs-3">$${producto.precio} ARS</p>
    
    <p class="card-text"><button class="btn btn-dark rounded-pill" onclick="agregarProducto(${producto.id});">Agregar (+)</button></p>`;
    document.getElementById("imagenProducto").innerHTML = htmlImagenProducto;
    document.getElementById("detalleProducto").innerHTML = htmlDetalleProducto;
}

recorrerProducto();
recorrerBotonCarrito();