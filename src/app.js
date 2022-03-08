window.onload = () => {
    init();
}

const init = async () => {
    const pokeArrays = await getPokemon();
    console.log(pokeArrays);
    const transformPoke = await mapPokemon(pokeArrays);
    console.log(transformPoke);
    printPokemon(transformPoke);
}

const getPokemon = async () => {
    let pokeArrays = [];
    for (let i = 1; i <= 152; i++) {
        const data = await fetch('https://pokeapi.co/api/v2/pokemon/' + i);
        const dataToJson = await data.json();
        pokeArrays.push(dataToJson);
    } return pokeArrays;

}

const mapPokemon = (pokeArrays) => {
    const transformPoke = pokeArrays.map(poke => {
        return {
            name: poke.name,
            img: poke.sprites.other.dream_world.front_default,
            id: poke.id,
            types: poke.types.map(type => type.type.name).join(', '),
            height: poke.height / 10,
            weight: poke.weight / 10
        }
    })
    return transformPoke;
}

const printPokemon = (pokeArrays) => {
    const pokeDiv = document.createElement('div');
    pokeDiv.className = 'containerPoke';
    pokeArrays.forEach(poke => {
        pokeDiv.innerHTML += `<div class="pokeCard">
        <h2>${poke.name}</h2>
        <img src="${poke.img}" alt="${poke.name}">
        <div class="pokeInfo">
            <h3>${poke.types}</h3>
            <p>${poke.height}</p>
            <p>${poke.weight}</p>
        </div>`

    });
    document.body.appendChild(pokeDiv);
}




