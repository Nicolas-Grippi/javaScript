const camisetas = [
    { id: 1, nombre: "Argentina 2024", precio: 60000 },
    { id: 2, nombre: "River 2010", precio: 45000 },
    { id: 3, nombre: "Boca 2014", precio: 45000 },
    { id: 4, nombre: "Racing 2015", precio: 40000 }
];

function mostrarCamisetaConPorcentaje(nombre, cuotas) {
    // Buscar la camiseta por su nombre
    let camiseta = camisetas.find(camiseta => camiseta.nombre.toLowerCase() === nombre.toLowerCase());
    if (camiseta) {
        let nombreCamiseta = camiseta.nombre;
        let precioOriginal = camiseta.precio;
        // Calcular el porcentaje adicional según las cuotas elegidas
        let porcentajeAdicional = calcularPorcentajeAdicional(cuotas);
        // Calcular el precio con cuotas y porcentaje adicional
        let precioConCuotas = calcularPrecioConCuotas(precioOriginal, cuotas);
        let precioConPorcentaje = precioConCuotas + (precioConCuotas * (porcentajeAdicional / 100));
        // Mostrar el resultado en una alerta
        alert("Nombre: " + nombreCamiseta + "\nPrecio original: " + precioOriginal.toFixed(2) + "\nPrecio con " + cuotas + " cuotas y " + porcentajeAdicional + "% adicional: " + precioConPorcentaje.toFixed(2));
    } else {
        alert("Camiseta no encontrada.");
    }
}

// Función para calcular el porcentaje adicional según las cuotas
function calcularPorcentajeAdicional(cuotas) {
    if (cuotas === 6) {
        return 21;
    } else if (cuotas === 12) {
        return 45;
    } else {
        return 0; // Si no se selecciona 6 o 12 cuotas, no se agrega porcentaje adicional
    }
}

// Función para calcular el precio con cuotas
function calcularPrecioConCuotas(precio, cuotas) {
    if (cuotas === 6) {
        return precio * 1.21;
    } else if (cuotas === 12) {
        return precio * 1.45;
    } else {
        return precio; // Si no se selecciona 6 o 12 cuotas, el precio es el original
    }
}

// Mostrar lista de camisetas al usuario
let mensaje = "Seleccione una camiseta por su nombre:\n";
for (let i = 0; i < camisetas.length; i++) {
    mensaje += camisetas[i].nombre + " - Precio: " + camisetas[i].precio.toFixed(2) + "\n";
}

let nombreSeleccionado = prompt(mensaje);
let cuotasSeleccionadas = parseInt(prompt("Ingrese la cantidad de cuotas (6 o 12):"));

mostrarCamisetaConPorcentaje(nombreSeleccionado, cuotasSeleccionadas);
