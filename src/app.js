let transformPoke = [];

window.onload = () => {
    init();
    const input = document.querySelector("#search");
    const btn = document.querySelector("#btn");
    input.addEventListener("input", () => search());
    btn.addEventListener("click", () => search());
}

const init = async () => {
    const pokeArrays = await getPokemon();
    console.log(pokeArrays);
    transformPoke = await mapPokemon(pokeArrays);
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
            name: poke.name.toUpperCase(),
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

    let pokeDiv = document.querySelector(".containerPoke") ? document.querySelector(".containerPoke") : document.createElement("div");
    pokeDiv.innerHTML = "";
    pokeDiv.className = 'containerPoke';
    pokeArrays.forEach(poke => {
        pokeDiv.innerHTML += `<div class="containerPoke__card">
        <h2>${poke.name}</h2>
        <img src="${poke.img}" alt="${poke.name}">
        <div class="containerPoke__card__info">
            <p>Tipo:  ${poke.types}</p>
            <p>Altura: ${poke.height}m</p>
            <p>Peso: ${poke.weight}Kg</p>
        </div>`
    });
    document.body.appendChild(pokeDiv);
}


const search = () => {
    const inputPoke = document.querySelector("#search");
    console.log(inputPoke);
    const filterPokemon = transformPoke.filter(poke => (poke.name.toLowerCase().includes(inputPoke.value.toLowerCase())));
    console.log(filterPokemon);
    printPokemon(filterPokemon);


}



