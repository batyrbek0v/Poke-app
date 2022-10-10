
// DOM-ELEMENTS

const $container = document.querySelector('.container')
const $wrapper = document.querySelector('.wrapper')


// ==================================================

const POKE_BASE = 'https://pokeapi.co/api/v2/'

const limitOfPokemons = 12

const offsetCounter = 0



window.addEventListener('load', () => {
	getPokemons
		(
			`${POKE_BASE}pokemon`, `limit=${limitOfPokemons}&offset=${offsetCounter}`, cb => {
				cardTemplate(cb.results)
			}
		)
})


const getPokemons = (url, query, callback) => {
	fetch(`${url}?${query}`)
		.then(res => res.json())
		.then(res => callback(res))
}

const cardTemplate = (pokemons) => {
	const template = pokemons.map(({ name, url }) => `
	<div class="card">
      <div class="card_title">
        <h2>${name} ${offsetCounter}</h2>
      </div>
      <div class="card_body">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1280px-International_Pok%C3%A9mon_logo.svg.png">
      </div>
      <div class="card_footer">
        <button onclick="getSinglePokemon('${url}')" class="moreBtn">Go to pokedex</button>
      </div>
    </div>
  `).join('')
	$wrapper.innerHTML = template

	console.log(pokemons);
}
