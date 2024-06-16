alert("Hola aqui te diremos el interes de tu compra en cuotas");
alert("Acuerdate que en 6 cuotas el interes es de 21% y en 12 es de 45%");

// Definimos la función para calcular el precio con cuotas
function calcularPrecioConCuotas(precio, cuotas) {
    if (cuotas == 6) {
        return precio * 1.21;
    } else if (cuotas == 12) {
        return precio * 1.45;
    } else {
        return precio; 
    }
}

// Función para solicitar un número al usuario con validación para que no ingrese letras o espacios en blanco
function solicitarNumero(mensaje) {
    let numero;
    do {
        numero = prompt(mensaje);
    } while (isNaN(numero) || numero === null || numero.trim() === "");
    return parseFloat(numero);
}

// Solicitamos el precio y las cuotas al usuario 
let precio = solicitarNumero("Ingrese el precio de las zapatillas a pagar: ");
let cuotas = solicitarNumero("Ingrese la cantidad de cuotas que desea: ");

// Calculamos el precio final usando la función
let precioFinal = calcularPrecioConCuotas(precio, cuotas);

// Mostramos el resultado al usuario
if (cuotas == 6 || cuotas == 12) {
    alert("Tu precio es: " + precioFinal);
} else {
    alert("El precio no se modifica. Tu precio es: " + precioFinal);
}
