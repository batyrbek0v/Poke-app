
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
        <h2>${name}</h2>
      </div>
      <div class="card_body">
        <img src="/IMG/pokemon.png" alt=${name} />
      </div>
      <div class="card_footer">
        <button class="moreBtn" onclick="getSinglePokemon('${url}')">Go to pokedex</button>
      </div>
    </div>
  `).join('')
	$wrapper.innerHTML = template
}


const getSinglePokemon = (url) => {
	getPokemons(url, '', cb => {
		$container.innerHTML = `
		<div class="more_container">
			<div class="single_main">
				<div class="single">
					<div class="more_title">
						<h1>${cb.name} #${cb.id}</h1>
					</div>
					<img src="${cb.sprites.other.dream_world.front_default}" alt="${cb.name}">
				</div>
			</div>
			<div class="stats_container">
				<div class="stats_block">
					<ul class="more_list">
						<li>Weigth: <span>${(cb.weight / 10)} kg</span></li>
						<li>Height: <span>${(cb.height / 10)} meter</span></li>
						<li>Ability: <span>${cb.abilities[0].ability.name}</span></li>
						<li>Base experience: ${cb.base_experience}</li>
						<li class="${cb.types[0].type.name}">Type: ${cb.types[0].type.name}</li>
					</ul>
				</div>
				<div class="stats_block2">
					<div class="stats_inline">
						<div class="stats">
							<div class="progress" style="height:${cb.stats[0].base_stat}pt;">${cb.stats[0].base_stat}</div>
							<h2><i class="fa fa-heart"></i></h2>
						</div>
						<div class="stats">
							<div class="progress" style="height:${cb.stats[1].base_stat}pt;">${cb.stats[1].base_stat}</div>
							<h2><i class="fas fa-fist-raised"></i></h2>
						</div>
						<div class="stats">
							<div class="progress" style="height:${cb.stats[2].base_stat}pt;">${cb.stats[2].base_stat}</div>
							<h2><i class="fas fa-shield-alt"></i></h2>
						</div>
						<div class="stats">
							<div class="progress" style="height:${cb.stats[3].base_stat}pt;">${cb.stats[3].base_stat}</div>
							<h2><i class="fas fa-fist-raised"></i></h2>
						</div>
						<div class="stats">
							<div class="progress" style="height:${cb.stats[4].base_stat}pt;">${cb.stats[4].base_stat}</div>
							<h2><i class="fas fa-shield-alt"></i></h2>
						</div>
						<div class="stats">
							<div class="progress" style="height:${cb.stats[5].base_stat}pt;">${cb.stats[5].base_stat}</div>
							<h2><i class="fas fa-bolt"></i></h2>
						</div>
					</div>
				</div>
			</div>
			<div class="back">
				<button onclick="goBack()" class="backBtn">Back</button>
			</div>
		</div>
		`
	})
}

const goBack = () => window.location.reload()