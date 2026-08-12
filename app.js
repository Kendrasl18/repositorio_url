// =========================================================
// 1. CONSTANTES, VARIABLES Y TIPOS DE DATOS
// =========================================================
const NOMBRE_TIENDA = "TechStore"; // Constante String
const IMPUESTO = 0.13;            // Constante Number (Flotante)

let totalVentas = 0;              // Variable Number (Entero)
let tiendaAbierta = true;         // Variable Boolean

// =========================================================
// 2. OBJETOS Y MÉTODOS DE OBJETOS
// =========================================================
const tienda = {
  nombre: NOMBRE_TIENDA,
  descuento: 2,
  // Método del objeto
  calcularTotal: function (precio, cantidad) {
    // Operaciones matemáticas y operadores aritméticos (*, -)
    let subtotal = (precio * cantidad) - this.descuento;
    return subtotal + (subtotal * IMPUESTO);
  }
};

// =========================================================
// 3. FUNCIONES, PROMPT, CONVERSIÓN Y FLUJO DE CONTROL
// =========================================================
function procesarCompra() {
  // Solicitar valores por pantalla (Prompt)
  let entradaPrecio = prompt("Ingrese el precio del producto:");
  let entradaCantidad = prompt("Ingrese la cantidad:");

  // Funciones de conversión de datos
  let precio = parseFloat(entradaPrecio);
  let cantidad = parseInt(entradaCantidad);

  // Operadores lógicos (||), comparativos (<=) y condicional (if/else)
  if (isNaN(precio) || isNaN(cantidad) || precio <= 0 || cantidad <= 0) {
    alert("Error: Ingrese números válidos mayores a 0.");
    return;
  }

  // Sentencia de bucle (for)
  let contadorTexto = "";
  for (let i = 1; i <= cantidad; i++) {
    contadorTexto += `[Producto ${i}] `;
  }

  // Sentencia Switch
  let tipoCliente = "VIP";
  let mensajeCliente = "";
  switch (tipoCliente) {
    case "VIP":
      mensajeCliente = "Cliente VIP";
      break;
    default:
      mensajeCliente = "Cliente Normal";
      break;
  }

  // Cadenas (Template String + Método de Cadena)
  let totalPagar = tienda.calcularTotal(precio, cantidad);
  let resumen = `${tienda.nombre.toUpperCase()} | ${mensajeCliente}: Total $${totalPagar.toFixed(2)}`;

  // =========================================================
  // 4. SELECTORES, DOM Y MODIFICACIÓN DE ESTILOS
  // =========================================================
  const contenedor = document.getElementById("resultado-compra"); // Selector getElementById
  const primerBoton = document.querySelector("#btn-comprar");      // Selector querySelector

  // Modificar contenido y estilos vía DOM
  contenedor.innerText = `${resumen}\nProcesados: ${contadorTexto}`;
  contenedor.style.display = "block";         // Estado / Posicionamiento
  contenedor.style.color = "green";            // Estilo
  contenedor.style.marginTop = "10px";

  // Operador de asignación
  totalVentas += 1;
}

// =========================================================
// 5. GEOLOCALIZACIÓN Y LOCALSTORAGE (Objeto navigator)
// =========================================================
function obtenerUbicacion() {
  const textoGeo = document.getElementById("texto-geo");

  // Incorporar objeto navigator
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((posicion) => {
      const coords = {
        lat: posicion.coords.latitude,
        lon: posicion.coords.longitude
      };

      // Guardar en Almacenamiento Local (LocalStorage) convirtiendo a JSON
      localStorage.setItem("mi_ubicacion", JSON.stringify(coords));
      
      textoGeo.innerText = `Guardado: Lat ${coords.lat.toFixed(2)}, Lon ${coords.lon.toFixed(2)}`;
    });
  }
}

// =========================================================
// 6. WEB WORKERS
// =========================================================
let worker;
function ejecutarWorker() {
  if (typeof Worker !== "undefined") {
    // Instanciar Worker por ruta relativa
    worker = new Worker("js/worker.js");
    
    // Propiedades / Atributos del Worker (onmessage)
    worker.onmessage = function (e) {
      document.getElementById("texto-worker").innerText = e.data;
    };
    
    worker.postMessage("empezar");
  }
}

// =========================================================
// 7. EVENTOS
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-comprar").addEventListener("click", procesarCompra);
  document.getElementById("btn-geo").addEventListener("click", obtenerUbicacion);
  document.getElementById("btn-worker").addEventListener("click", ejecutarWorker);
});