
// DOM-ELEMENTS

const $container = document.querySelector('.container')
const $wrapper = document.querySelector('.wrapper')
const $searchInput = document.querySelector('.searchInput')
const $select = document.querySelector('.select')
const $currentPage = document.querySelector('.currentPage')
const $allPages = document.querySelector('.allPages')
const $nextBtn = document.querySelector('.next')
const $prevBtn = document.querySelector('.prev')

// ==================================================


// DATABASE ---------------------------------
const POKE_BASE = 'https://pokeapi.co/api/v2/'
// DATABASE ---------------------------------

const limitOfPokemons = 12
const allPokemons = 1154
const AllPages = Math.floor(allPokemons / limitOfPokemons)

let offsetCounter = 0
let currentPage = 1

window.addEventListener('load', () => {
	getPokemons
		(
			`${POKE_BASE}pokemon`, `limit=${limitOfPokemons}&offset=${offsetCounter}`, cb => {
				cardTemplate(cb.results)
			}
		)
	$allPages.innerHTML = AllPages
	$currentPage.innerHTML = currentPage
	$prevBtn.setAttribute('disabled', true)
})

// window.addEventListener('error', () => {
// 	$wrapper.innerHTML = `
// 		<div class="error-block">
// 			<div class="error-title">
// 				<h2>Network or technical issues</h2>
// 			</div>
// 			<img src="/IMG/pokemon.png" alt="error-image">
// 		</div>
// 	`
// })

// MINI ARROW FUNCTIONS 
const goBack = () => window.location.reload()
const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
// -------------------------------------------------------------------------------

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
        <button class="moreBtn" onclick="getSinglePokemon('${url}')">
					<i class="far fa-star"></i>
				</button>
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
						<li>
								Type:
									<span class="${cb?.types[0]?.type.name}">
										${cb.types[0].type.name}
									</span>
									<span class="${cb.types[1]?.type.name ? cb.types[1]?.type.name : ''}">
										${
												cb.types[1]?.type.name
												? cb.types[1]?.type.name
												: ''
											}
									</span>
						</li>
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
							<h2><i class="fas fa-tachometer-alt"></i></h2>
						</div>
					</div>
				</div>
			</div>
			<div class="back">
				<button onclick="goBack()" class="backBtn">Back</button>
			</div>
		</div>
		`
		console.log(cb);
	})
}


$nextBtn.addEventListener('click', e => {
	e.preventDefault()

	offsetCounter += limitOfPokemons
	currentPage++

	currentPage === AllPages && setAttribute('disabled', true)

	$prevBtn.removeAttribute('disabled')

	getPokemons(`${POKE_BASE}pokemon`,`limit=${limitOfPokemons}&offset=${offsetCounter}`, cb => {
		cardTemplate(cb.results)
	})
	// scrollTop()
})


$prevBtn.addEventListener('click' , e => {
	e.preventDefault()

	offsetCounter -= limitOfPokemons
	currentPage --

	getPokemons(`${POKE_BASE}pokemon`, `limit=${limitOfPokemons}&offset=${offsetCounter}`, cb => {
		cardTemplate(cb.results)
	})

	$nextBtn.removeAttribute('disabled')
})








$searchInput.addEventListener('input', e => {

	selectPage = e.target.value.toLowerCase().trim()

	const selectedValue = $select.value

	if (selectedValue === 'name') {
		getPokemons(`${POKE_BASE}pokemon`, `limit=${allPokemons}&offset=${offsetCounter}`, cb => {
			const pokeFilter = cb.filter(item => item.name.toLowerCase().includes(selectPage))
			cardTemplate(pokeFilter)
			console.log(cb);
		})
	}
})

