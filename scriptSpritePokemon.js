async function catchSpriteAndSetInHtml(){

    resultadosDiv = document.getElementById('resultadosDiv');
    resultadosDiv.style.display = "none";

    const loadingGif = document.getElementById('loading');
    loadingGif.style.display = "block";

    try{
        var pokemonNameValue = document.getElementById("pokemonNameInput").value.trim();
        pokemonNameValue = pokemonNameValue.toLowerCase();
        if(pokemonNameValue === ''){
            alert("O campo não pode estar vazio!");
            return
        }

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNameValue}`);
        
        if (!response.ok){
            alert('Nenhum Pokémon encontrado!');
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();
        console.log(data);

        resultadosDiv.style.display = "block";

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
        const pokemonTypesElement = document.getElementById('pokemonTypes');
        pokemonTypesElement.textContent = `Types: ${pokemonTypes}`;


        document.getElementById('pokemonTypes').textContent = pokemonTypes;
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
        catchSpriteAndSetInHtml();
        event.preventDefault();
    }
});