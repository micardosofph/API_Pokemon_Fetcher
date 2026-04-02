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
    electric: "#FBE33B",
    psychic: "#F362B1",
    ice: "#96F0FE",
    dragon: "#8974FF",
    dark: "#8C6754",
    fairy: "#FAADFF"
};

let allPokemonList = []; // Lista com {name, url} de todos os ~1300 pokemons
let currentPage = 1;
const limit = 20;


// Função que roda UMA VEZ ao carregar a página
async function init() {
    // A URL correta deve ser uma string única e limpa
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1800');
    const data = await response.json();
    allPokemonList = data.results;
    fetchAndRenderPokemons();
}

async function fetchAndRenderPokemons(filteredList = null) {
    const grid = document.getElementById('pokemonGrid');
    grid.innerHTML = Array(limit).fill('<div class="skeleton-card"></div>').join('');

    const offset = (currentPage - 1) * limit;

    // Se houver lista filtrada (busca), usa ela. Se não, usa a lista global.
    const sourceList = filteredList || allPokemonList;
    const paginatedItems = sourceList.slice(offset, offset + limit);

    try {
        const pokemonPromises = paginatedItems.map(p => fetchPokemonDetails(p.url));
        const allPokemonData = await Promise.all(pokemonPromises);

        grid.innerHTML = '';
        allPokemonData.forEach(pokemon => renderPokemonCardIntoGrid(pokemon));

        // Atualiza interface
        document.getElementById('pageIndicator').textContent = `Page ${currentPage}`;
        document.getElementById('prevBtn').disabled = currentPage === 1;
        document.getElementById('nextBtn').disabled = offset + limit >= sourceList.length;

    } catch (error) {
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

init();