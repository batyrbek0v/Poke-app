

const POKE_BASE = 'https://pokeapi.co/api/v2/'

const limitOfPokemons = 12

const offsetCounter = 0



window.addEventListener('load', () => {
	getPokemons
		(
			`${POKE_BASE}pokemon`, `limit=${limitOfPokemons}&offset=${offsetCounter}`, cb => {
				console.log(cb);
			}
		)
})


const getPokemons = (url, query, callback) => {
	fetch(`${url}?${query}`)
		.then(res => res.json())
		.then(res => callback(res))
}