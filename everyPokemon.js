const typeColors = {
    normal: "#BBBBAF",
    fighting: "#A65842",
    flying: "#79A4FF",
    poison: "#A75C9F",
    ground: "#E7C45E",
    rock: "#CEBC72",
    bug: "#C3D21F",
    ghost: "#7975D6",
    steel: "#C3C0DB",
    fire: "#F75141",
    water: "#55AEFE",
    grass: "#82C649",
    electric: "#FB65B4",
    psychic: "#F362B1",
    ice: "#96F0FE",
    dragon: "#8974FF",
    dark: "#8C6754",
    fairy: "#FAADFF"
};

let currentPage = 1;
const limit = 20;

async function fetchAndRenderPokemons() {
    const grid = document.getElementById('pokemonGrid');
    
    // 1. Cria os Skeletons (20 cartões pulsando)
    grid.innerHTML = Array(limit).fill('<div class="skeleton-card"></div>').join('');

    const offset = (currentPage - 1) * limit;
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // 2. Busca todos os detalhes em paralelo (Muito mais rápido!)
        const pokemonPromises = data.results.map(pokemonBase => fetchPokemonDetails(pokemonBase.url));
        const allPokemonData = await Promise.all(pokemonPromises);

        // 3. Limpa os skeletons e renderiza os dados reais
        grid.innerHTML = '';
        allPokemonData.forEach(pokemon => {
            renderPokemonCardIntoGrid(pokemon);
        });

        // Interface
        document.getElementById('pageIndicator').textContent = `Page ${currentPage}`;
        document.getElementById('prevBtn').disabled = currentPage === 1;

    } catch (error) {
        console.error("Erro:", error);
        grid.innerHTML = '<p>Error loading Pokémons.</p>';
    }
}

async function fetchPokemonDetails(url) {
    const response = await fetch(url);
    return await response.json();
}

function renderPokemonCardIntoGrid(pokemon) {
    const grid = document.getElementById('pokemonGrid');
    const card = document.createElement('div');
    card.className = 'pokemon-card';

    // Badges dos Tipos
    const typesHTML = pokemon.types.map(t => {
        const color = typeColors[t.type.name] || '#ccc';
        return `<span class="type-badge" style="background-color: ${color};">${t.type.name}</span>`;
    }).join('');

    card.innerHTML = `
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <h3>#${pokemon.id.toString().padStart(4, '0')}</h3>
        <p class="name">${pokemon.name}</p>
        <div class="pokemonCard-types">${typesHTML}</div>
    `;

    grid.appendChild(card);
}

function changePage(step) {
    currentPage += step;
    fetchAndRenderPokemons();
}

fetchAndRenderPokemons();