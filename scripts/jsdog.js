document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("consultar").addEventListener("click", verImagenPerro);
});

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

function mostrarImagenPerro(data, contenedorId, nombre) {
    const template = document.getElementById("perro-template").content.cloneNode(true);

    template.querySelector(".perro-img").src = data.message;
    template.querySelector(".perro-nombre").textContent= nombre;

    const contenedor = document.getElementById(contenedorId);
    contenedor.innerHTML = ""; // Limpiar resultado anterior
    contenedor.appendChild(template);
}

