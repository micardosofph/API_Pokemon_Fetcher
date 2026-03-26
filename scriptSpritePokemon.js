async function fetchAndDisplayPokemon(){

    const resultsContainer = document.getElementById('resultadosDiv');
    resultsContainer.style.display = "none";

    const loadingGif = document.getElementById('loading');
    loadingGif.style.display = "block";

    try{
        var pokemonNameValue = document.getElementById("pokemonNameInput").value.trim();
        pokemonNameValue = pokemonNameValue.toLowerCase();
        if(pokemonNameValue === ''){
            alert("This field cannot be empty!");
            return
        }

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNameValue}`);
        
        if (!response.ok){
            alert('No pokémon found!');
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();
        console.log(data);

        resultsContainer.style.display = "block";

        const pokemonSprite = data.sprites.front_default;
        const imgElement = document.getElementById('pokemonSprite');
        imgElement.src = pokemonSprite;
        imgElement.style.display = "block";

        const pokemonName = data.name;
        const pokemonNameElement = document.getElementById('pokemonName');
        pokemonNameElement.textContent = `Name: ${pokemonName}`;

        const pokemonId = data.id;
        const pokemonIdElement = document.getElementById('pokemonId');
        pokemonIdElement.textContent = `Id: ${pokemonId}`;

        const pokemonTypes = data.types.map(tipo => tipo.type.name);
        const pokemonTypesFormatted = pokemonTypes.join(', ');
        const pokemonTypesElement = document.getElementById('pokemonTypes');

        if(pokemonTypes.length > 1){
            pokemonTypesElement.textContent = `Types: ${pokemonTypesFormatted}`;
        }
        else{
            pokemonTypesElement.textContent = `Type: ${pokemonTypesFormatted}`;
        }

    }

    catch(error){
        console.log(error);
    }

    finally{
        loadingGif.style.display = "none";
    }
}

const pokemonName = document.getElementById('pokemonNameInput');
pokemonName.addEventListener("keydown", function (event) { 
    if (event.key === "Enter") {
        fetchAndDisplayPokemon();
        event.preventDefault();
    }
});