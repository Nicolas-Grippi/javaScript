alert("Hola aqui te diremos el interes de tu compra en cuotas");
alert("Acuerdate que en 6 cuotas el interes es de 21% y en 12 es de 27%");

let precio = prompt("ingrese el precio de las zapatillas a pagar: ");
let cuotas = prompt("Ingrese la cantidad de cuotas que desea: ")

if (cuotas == 6 ) {
    alert("Tu precio es: "+ precio * 1.21);  
} else if (cuotas == 12) {
    alert("Tu precio es: "+ precio * 1.27);
} else {
alert("El precio no se modifica");
}