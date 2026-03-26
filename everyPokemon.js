const pokemonTypesAndColor = [
  {
    "name": "normal",
    "color": "#BBBBAF"
  },
  {
    "name": "fighting",
    "color": "#A65842"
  },
  {
    "name": "flying",
    "color": "79A4FF"
  },
  {
    "name": "poison",
    "color": "#A75C9F"
  },
  {
    "name": "ground",
    "color": "#E7C45E"
  },
  {
    "name": "rock",
    "color": "#CEBC72"
  },
  {
    "name": "bug",
    "color": "#C3D21F"
  },
  {
    "name": "ghost",
    "color": "#7975D6"
  },
  {
    "name": "steel",
    "color": "#C3C0DB"
  },
  {
    "name": "fire",
    "color": "#F75141"
  },
  {
    "name": "water",
    "color": "#55AEFE"
  },
  {
    "name": "grass",
    "color": "#82C649"
  },
  {
    "name": "electric",
    "color": "#FB65B4"
  },
  {
    "name": "psychic",
    "color": "#F362B1"
  },
  {
    "name": "ice",
    "color": "#96F0FE"
  },
  {
    "name": "dragon",
    "color": "#8974FF"
  },
  {
    "name": "dark",
    "color": "#8C6754"
  },
  {
    "name": "fairy",
    "color": "#FAADFF"
  }
]

let currentPage = 1;
const limit = 20;

async function fetchAndRenderPokemons() {
  const grid = document.getElementById('pokemonGrid');
  grid.innerHTML = '<p>Loading pokémon...</p>';
  const offset = (currentPage - 1) * limit;
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    grid.innerHTML = '';

    for (const pokemonBase of data.results) {
      await createPokemonCard(pokemonBase.url);
    }

    // Atualiza o número da página na tela
    document.getElementById('pageIndicator').textContent = `Page ${currentPage}`;

    // Desabilita o botão "Previous" se estiver na página 1
    document.getElementById('prevBtn').disabled = currentPage === 1;

  } catch (error) {
    console.error("Error fetching Pokémons:", error);
    grid.innerHTML = '<p>Error loading Pokémons. Please try again.</p>';
  }


}

async function createPokemonCard(url) {
  const response = await fetch(url);
  const pokemon = await response.json();
  
  const card = document.createElement('div');
  card.className = 'pokemon-card';
  const pokedexNumber = pokemon.id.toString().padStart(4, '0'); // Vira "001"
  
  // Formatando os tipos (com o nosso join e singular/plural)
  const types = pokemon.types.map(t => t.type.name);
  const typeLabel = types.length > 1 ? 'Types' : 'Type';

  card.innerHTML = `
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <h3>#${pokedexNumber}</h3>
        <p class="name">${pokemon.name}</p>
        <p class="types"><strong>${typeLabel}:</strong> ${types.join(', ')}</p>
    `;

  document.getElementById('pokemonGrid').appendChild(card);
}

function changePage(step) {
  currentPage += step;
  fetchAndRenderPokemons();
}

// Inicia a busca assim que a página carrega
fetchAndRenderPokemons();