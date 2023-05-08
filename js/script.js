// Pokemon
const pokemonname = document.querySelector('.pokemon_name');
const pokemonnumber = document.querySelector('.pokemon_number');
const pokemonimage = document.querySelector('.pokemon_image');
// Pokedex
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
// botão
let searchPokemon = 1;
const fetchPokemon = async(pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIResponse.status == 200){
    const data = await APIResponse.json(); 
    return data;
    }
}

const renderPokemon = async(pokemon) => {
    pokemonname.innerHTML = 'Loading...';
    pokemonnumber.innerHTML = '';
    const data = await fetchPokemon(pokemon);
    if (data){
    pokemonname.innerHTML = data.name;
    pokemonnumber.innerHTML = data.id;
    pokemonimage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;
    }else{
        pokemonimage.src = './img/missigno.gif';
        pokemonname.innerHTML = 'Missigno';
        pokemonnumber.innerHTML = '';
        input.value = '';
    }
}
form.addEventListener('submit', () => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});
buttonPrev.addEventListener('click', () => {
    if(searchPokemon>1){
    searchPokemon -=1;
    renderPokemon(searchPokemon);
    }
});
buttonNext.addEventListener('click', () => {
    searchPokemon +=1;
    renderPokemon(searchPokemon);
});
renderPokemon(searchPokemon)