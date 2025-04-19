
// Este script se encarga de manejar la interacción con la API de Pokémon y mostrar la información en la página web
// Se utiliza la API de Pokémon para obtener información sobre un Pokémon específico o varios Pokémon a la vez
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("consultar").addEventListener("click", consultarPokemon);
    document.getElementById("consultarCantidad").addEventListener("click", consultarVariosPokemones); 
});


// Función para consultar un Pokémon por nombre
// Se obtiene el nombre del Pokémon desde el input y se hace una consulta a la API de Pokémon

function consultarPokemon() {
    const nombre = document.getElementById("nombreInput").value.trim().toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${nombre}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon no encontrado');
            }
            return response.json();
        })
        .then(data => mostrarPokemon(data, "pokemonInfo"))
        .catch(error => {
            document.getElementById("pokemonInfo").textContent = "Por favor verifique la entrada";
        });
}

// Función para mostrar la información del Pokémon
// Se utiliza un template para mostrar la información del Pokémon en el contenedor especificado

function mostrarPokemon(data, contenedorId) {
    const template = document.getElementById("pokemon-template").content.cloneNode(true);

    template.querySelector(".pokemon-img").src = data.sprites.front_default;
    template.querySelector(".pokemon-img").alt = data.name;
    template.querySelector(".pokemon-nombre").textContent = `Nombre: ${data.name}`;
    template.querySelector(".pokemon-altura").textContent = `Altura: ${data.height}`;
    template.querySelector(".pokemon-peso").textContent = `Peso: ${data.weight}`;
    template.querySelector(".pokemon-habilidades").textContent = `Habilidades: ${data.abilities.map(abil => abil.ability.name).join(", ")}`;

    const contenedor = document.getElementById(contenedorId);
    contenedor.innerHTML = ""; // Limpiar resultado anterior
    contenedor.appendChild(template);
}



// Función para consultar varios Pokémon
// Se obtiene la cantidad de Pokémon a consultar desde el input

function consultarVariosPokemones() {
    const cantidad = document.getElementById("cantidadInput").value.trim();
    if (isNaN(cantidad) || cantidad <= 0) {
        document.getElementById("CantidadInfo").textContent = "Por favor, ingresa un número válido.";
        return;
    }

    var url = `https://pokeapi.co/api/v2/pokemon?limit=${cantidad}&offset=0`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener la lista de Pokémon');
            }
            return response.json();
        })
        .then(data => {
            const promises = data.results.map(pokemon => fetch(pokemon.url).then(res => res.json()));
            return Promise.all(promises);
        })
        .then(pokemones => mostrarPokemones(pokemones))
        .catch(error => {
            document.getElementById("CantidadInfo").textContent = "Por favor verifique la entrada";
        });
};

// Función para mostrar varios Pokémon
// Se utiliza un template para mostrar la información de cada Pokémon en el contenedor especificado
function mostrarPokemones(pokemones) {
    const contenedor = document.getElementById("CantidadInfo");
    contenedor.innerHTML = ""; 

    pokemones.forEach(data => {
        const template = document.getElementById("pokemon-template").content.cloneNode(true);

        template.querySelector(".pokemon-img").src = data.sprites.front_default;
        template.querySelector(".pokemon-img").alt = data.name;
        template.querySelector(".pokemon-nombre").textContent = `Nombre: ${data.name}`;
        template.querySelector(".pokemon-altura").textContent = `Altura: ${data.height}`;
        template.querySelector(".pokemon-peso").textContent = `Peso: ${data.weight}`;
        template.querySelector(".pokemon-habilidades").textContent = `Habilidades: ${data.abilities.map(abil => abil.ability.name).join(", ")}`;

        contenedor.appendChild(template);
    });
}
