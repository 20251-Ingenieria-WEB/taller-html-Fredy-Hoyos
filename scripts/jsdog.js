
// Este archivo contiene el código JavaScript para la funcionalidad de la página web que muestra imágenes de perros
// utilizando la API de Dog CEO. El código incluye funciones para consultar imágenes de un perro específico o varias imágenes de perros al azar, y muestra la información en la página web utilizando un template HTML.
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("consultar").addEventListener("click", verImagenPerro);
    document.getElementById("consultarCantidad").addEventListener("click", verVariasImagenesPerros);
    
});


// Función para consultar una imagen de un perro por nombre
// Se obtiene el nombre del perro desde el input y se hace una consulta a la API de Dog CEO
function verImagenPerro() {
    const nombre = document.getElementById("nombreP").value.trim().toLowerCase();
    const url = `https://dog.ceo/api/breed/${nombre}/images/random`;

    fetch(url) 
        .then(res => {
            if (!res.ok) {
                throw new Error('Nombre de perro no encontrado o no válido');
            }
            return res.json();
        })

        .then (data => mostrarImagenPerro(data, "dogInfo", nombre))
        .catch(error => {
            document.getElementById("dogInfo").textContent = "Por favor ingresa un nombre de perro válido";
        });
}


// Función para consultar varias imágenes de perros al azar
// Se obtiene la cantidad de imágenes a consultar desde el input
function mostrarImagenPerro(data, contenedorId, nombre) {
    const template = document.getElementById("perro-template").content.cloneNode(true);

    template.querySelector(".perro-img").src = data.message;
    template.querySelector(".perro-nombre").textContent= nombre;

    const contenedor = document.getElementById(contenedorId);
    contenedor.innerHTML = ""; // Limpiar resultado anterior
    contenedor.appendChild(template);
}


// Función para consultar varias imágenes de perros
// Se obtiene la cantidad de imágenes a consultar desde el input
function verVariasImagenesPerros() {
    const cantidad = document.getElementById("cantidadInput").value.trim();
    if (isNaN(cantidad) || cantidad <= 0) {
        document.getElementById("CantidadInfo").textContent = "Por favor, ingresa un número válido.";
        return;
    }   

    var url = `https://dog.ceo/api/breed/hound/images/random/${cantidad}`;

    fetch(url)        
        .then(res => {
            if (!res.ok) {
                throw new Error('Error al obtener la lista de perros');
            }
            return res.json();
        })
        .then(perros => mostrarImagenesPerros(perros.message)) // ← cambio aquí
        .catch(error => {
            document.getElementById("CantidadInfo").textContent ="Error al obtener la lista de perros: " + error.message;
        });
}


// Función para mostrar varias imágenes de perros
// Se utiliza un template para mostrar la información de los perros en el contenedor especificado
function mostrarImagenesPerros(perros) {

    const contenedor = document.getElementById("CantidadInfo");
    contenedor.innerHTML = ""; // Limpiar resultados anteriores

    perros.forEach(url => {
        const template = document.getElementById("perro-template").content.cloneNode(true);

        // Insertar imagen
        template.querySelector(".perro-img").src = url;

        // Extraer la raza desde la URL
        const partes = url.split('/');
        const raza = partes[4]; // Ej: "hound-afghan"
        template.querySelector(".perro-nombre").textContent = raza;

        contenedor.appendChild(template);
    });
}
