function teste() {
    const input = document.getElementById('pokemonNameInput');
    const searchTerm = input.value.toLowerCase();

    const filtered = allPokemonList.filter(p => p.name.includes(searchTerm));
    console.log(allPokemonList);

    currentPage = 1;

    fetchAndRenderPokemons(filtered); 
}
