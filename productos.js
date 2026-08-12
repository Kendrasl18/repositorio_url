// 1. Declarar JSON (String con formato JSON)
const jsonProductos = `[
  {"id": 1, "nombre": "Mouse", "precio": 15},
  {"id": 2, "nombre": "Teclado", "precio": 30},
  {"id": 3, "nombre": "Monitor", "precio": 150}
]`;

// 2. Recolectar / Parsear JSON
const listaProductos = JSON.parse(jsonProductos);

// 3. Buscar datos en JSON y modificar DOM
function buscar() {
  const texto = document.getElementById("input-buscar").value.toLowerCase();
  const contenedor = document.getElementById("lista-productos");
  contenedor.innerHTML = "";

  // Buscar / Filtrar en la lista recolectada del JSON
  const filtrados = listaProductos.filter(p => p.nombre.toLowerCase().includes(texto));

  filtrados.forEach(prod => {
    const div = document.createElement("div");
    div.innerText = `${prod.nombre} - $${prod.precio}`;
    contenedor.appendChild(div);
  });
}

// Evento al cargar
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-buscar").addEventListener("click", buscar);
});