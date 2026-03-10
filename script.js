fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
    .then(response => {
        if(!response.ok){
            throw new Error('could not fetch resource')
        }
        return response.json
    })
    .then(data => console.log(data.id))
    .catch(error => console.error(error))
;

fetchData();
async function fetchData(){


    try{
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/charmander");
        if (!response.ok){
            throw new Error("Could not fetch resource");
        }

        const data = await response.json;
        console.log(data);
    }

    catch(error){
        console.log(error);
    }
}