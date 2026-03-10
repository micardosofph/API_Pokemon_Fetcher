fetch('https://pokeapi.co/api/v2/pokemon?limit=1300')
  .then(response => response.json())
  .then(data => {
    data.results.forEach(pokemon => {
      console.log(pokemon.name); // Nome
      console.log(pokemon.url);  // URL para detalhes
    });
  });