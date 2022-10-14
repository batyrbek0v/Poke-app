
// DOM-ELEMENTS

const $container = document.querySelector('.container')
const $wrapper = document.querySelector('.wrapper')
const $searchInput = document.querySelector('.searchInput')
const $select = document.querySelector('.select')
const $selectPage = document.querySelector('.poke-form')
const $currentPage = document.querySelector('.currentPage')
const $allPages = document.querySelector('.allPages')
const $nextBtn = document.querySelector('.next')
const $prevBtn = document.querySelector('.prev')
const $sortBtnA = document.querySelector('.sort-btnA')
const $sortBtnZ = document.querySelector('.sort-btnZ')
const $sortBtnR = document.querySelector('.sort-btnR')
const $sortBtnNum = document.querySelector('.sort-btn1-9')
const $searchBtn = document.querySelector('.searchBtn')
const $loader = document.querySelector('.loader')
const $er = document.querySelector('.er')

// ==================================================


// DATABASE ---------------------------------
const POKE_BASE = 'https://pokeapi.co/api/v2/'
// DATABASE ---------------------------------

const limitOfPokemons = 12
const allPokemons = 1150
const allPages = Math.floor(allPokemons / limitOfPokemons)

let offsetCounter = 0
let currentPage = 1
let selectPage = 1

window.addEventListener('load', () => {

	$loader.innerHTML = `<div class="lds-circle"><div></div></div>`

	getPokemons
		(
			`${POKE_BASE}pokemon`, `limit=${limitOfPokemons}&offset=${offsetCounter}`, cb => {
				cardTemplate(cb.results)
			}
		)
	$allPages.innerHTML = allPages
	$currentPage.innerHTML = currentPage
	$prevBtn.setAttribute('disabled', true)

	if (!localStorage.getItem('pokemons')) {
		localStorage.setItem('pokemons', JSON.stringify([]))
	}
})




// FETCHING API
const getPokemons = (url, query, callback) => {
	fetch(`${url}?${query}`)
		.then(res => res.json())
		.then(res => callback(res))
		.catch(error => {
			$loader.style.display = 'none'
			$er.innerHTML = `
			<div>
				<h1>Error 404 !</h1>
				<h2>${error}</h2>
			</div>`
		})
}
// =============

// CARD-TEMPLATE
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
        <button class="moreBtn" onclick="getSinglePokemon('${url}')">
					Go to pokedex
				</button>
        <button class="moreBtn" onclick="addToFavorite('${url}')">
					<i class="far fa-star"></i>
				</button>
      </div>
    </div>
  `).join('')

	$wrapper.innerHTML = template
}
// =============

// MORE INFO 
const getSinglePokemon = (url) => {
	getPokemons(url, '', cb => {
		$container.innerHTML = `
		<div class="more_container">
			<div class="single_main">
				<div class="single">
					<div class="more_title">
						<h1>${cb.name} #${cb.id}</h1>
					</div>
					<img 
						src="${cb.sprites.other.dream_world.front_default || cb.sprites.other.home.front_default}" 
						alt="${cb.name}"
					>
				</div>
			</div>
			<div class="stats_container">
				<div class="stats_block">
					<ul class="more_list">
						<li>Weigth: <span>${(cb.weight / 10)} kg</span></li>
						<li>Height: <span>${(cb.height / 10)} m </span></li>
						<li>Ability: <span>${cb.abilities[0].ability.name}</span></li>
						<li>Base experience: ${cb.base_experience}</li>
						<li>
								Type:
									<span class="${cb?.types[0]?.type.name}">
										${cb.types[0].type.name}
									</span>
									<span class="${cb.types[1]?.type.name ? cb.types[1]?.type.name : ''}">
										${cb.types[1]?.type.name ? cb.types[1]?.type.name : ''}
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
	})
}
// =========


const addToFavorite = (url) => {

	getPokemons(url, '', pokemon => {

		const base = JSON.parse(localStorage.getItem('pokemons'))

		const saved = base.find(item => item.id === pokemon.id)

		console.log(saved)

		if (saved) {
			alert('Вы уже добавляли этого покемона')
		} else {
			localStorage.setItem('pokemons', JSON.stringify(
				[
					...base,
					{
						id: pokemon.id,
						name: pokemon.name,
						img: pokemon.sprites.other.dream_world.front_default,
						url: url,
					}
				]
			))
		}
	})

}


// PAGINATION FUNCTION
$nextBtn.addEventListener('click', e => {
	e.preventDefault()

	offsetCounter += limitOfPokemons
	currentPage++

	currentPage === allPages && $nextBtn.setAttribute('disabled', true)

	$prevBtn.removeAttribute('disabled')

	getPokemons(`${POKE_BASE}pokemon`, `limit=${limitOfPokemons}&offset=${offsetCounter}`, cb => {
		cardTemplate(cb.results)
	})
	changePage()
	scrollTop()
})

$prevBtn.addEventListener('click', e => {
	e.preventDefault()

	offsetCounter -= limitOfPokemons
	currentPage--

	currentPage === 1 && $prevBtn.setAttribute('disabled', true)

	getPokemons(`${POKE_BASE}pokemon`, `limit=${limitOfPokemons}&offset=${offsetCounter}`, cb => {
		cardTemplate(cb.results)
	})

	$nextBtn.removeAttribute('disabled')
	changePage()
	scrollTop()
})
// ===================

$select.addEventListener('change', e => {
	e.preventDefault()

	const nameValue = e.target.value

	nameValue === 'name'
		? $searchInput.setAttribute('placeholder', 'Search Pokemons')
		: $searchInput.setAttribute('placeholder', 'Enter page number')

})

// POKEMON SEARCH FUNCTION  
$searchInput.addEventListener('input', e => {

	selectPage = e.target.value.toLowerCase().trim()

	const selectedValue = $select.value

	selectedValue === 'name'
		&& getPokemons(`${POKE_BASE}pokemon`, `limit=${allPokemons}&offset=${offsetCounter}`, cb => {

			const pokeFilter = cb.results.filter(item => item.name.toLowerCase().includes(selectPage))

			cardTemplate(pokeFilter)
		})

	selectPage.length == 0 &&
		getPokemons(`${POKE_BASE}pokemon`, `limit=${limitOfPokemons}&offset=${offsetCounter}`, cb => {

			const initialPokemons = cb.results

			cardTemplate(initialPokemons)
		})

})


// PAGE SEARCH FUNCTION  
$searchBtn.addEventListener('click', e => {
	e.preventDefault()


	if (selectPage > allPages || selectPage < 1 || selectPage == currentPage) {

		alert('Введите корректное значение')

	} else {

		const selectedOffSet = selectPage * limitOfPokemons - limitOfPokemons

		offsetCounter = selectedOffSet

		$currentPage.innerHTML = selectPage
		currentPage = selectPage

		selectPage !== allPages
			? $nextBtn.removeAttribute('disabled')
			: $nextBtn.setAttribute('disabled', true)


		selectPage !== 1
			? $prevBtn.removeAttribute('disabled')
			: $prevBtn.setAttribute('disabled', true)

		getPokemons
			(
				`${POKE_BASE}pokemon`, `limit=${limitOfPokemons}&offset=${offsetCounter}`, cb => {
					cardTemplate(cb.results)
				}
			)

		$searchInput.value = ''
	}
})

// SORTING
$sortBtnZ.addEventListener('click', e => {
	e.preventDefault()

	getPokemons(`${POKE_BASE}pokemon`, `limit=${allPokemons}$offset=${offsetCounter}`, cb => {
		const pokeSort = cb.results.sort((a, b) => {
			if (a['name'] > b['name']) return -1
		})
		cardTemplate(pokeSort)
	})
})

$sortBtnA.addEventListener('click', e => {
	e.preventDefault()

	getPokemons(`${POKE_BASE}pokemon`, `limit=${allPokemons}$offset=${offsetCounter}`, cb => {
		const pokeSort = cb.results.sort((a, b) => {
			if (a['name'] < b['name']) return -1
		})
		cardTemplate(pokeSort)
	})

})

$sortBtnR.addEventListener('click', e => {
	e.preventDefault()

	getPokemons(`${POKE_BASE}pokemon`, `limit=${allPokemons}&offset=${offsetCounter}`, cb => {
		pokeRandom = cb.results.sort(() => Math.random() - 0.5)
		cardTemplate(pokeRandom)
	})
})

$sortBtnNum.addEventListener('click', e => {
	e.preventDefault()

	getPokemons(`${POKE_BASE}pokemon`, `limit=${limitOfPokemons}$offset=${offsetCounter}`, cb => {
		const pokeSort = cb.results.sort((a, b) => {
			if (a['name'] < b['name']) return 1
		})
		cardTemplate(pokeSort)
	})

})

// MINI ARROW FUNCTIONS 
const goBack = () => location.reload()
const changePage = () => $currentPage.innerHTML = currentPage
const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
// -------------------------------------------------------------------------------