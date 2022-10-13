
// DOM-ELEMENTS

const $container = document.querySelector('.container')
const $wrapper = document.querySelector('.wrapper')
const $loader = document.querySelector('.loader')

// ==================================================

window.addEventListener('load', () => {


  const savedPokemons = JSON.parse(localStorage.getItem('pokemons'))
  
  cardTemplate(savedPokemons)
  
})

const goBack = () => location.reload()


const cardTemplate = (pokemons) => {
  const template = pokemons.map(({ name, id, img }) => `
  <div class="card save_card">
      <div class="card_title">
        <h2>#${id} ${name}</h2>
      </div>
      <div class="card_body">
        <img src="${img}" alt=${name} />
      </div>
        <div class="card_footer">
        <button class="moreBtn" onclick="removeSavePokemon('${id}')">
  				<i class="fas fa-star"></i>
  			</button>
      </div>
    </div>
  `).join('')
  $wrapper.innerHTML = template
}

const removeSavePokemon = (id) => {

  const pokemon = JSON.parse(localStorage.getItem('pokemons'))

  const filtered = pokemon.filter(item => item.id != id)

  localStorage.setItem('pokemons', JSON.stringify(filtered))

  goBack()
}

const getSinglePokemon = (poke) => {
  $container.innerHTML = `
		<div class="more_container">
			<div class="single_main">
				<div class="single">
					<img 
						src="${poke}" 
						alt="Pokemon"
					>
				</div>
			</div>
			<div class="back">
				<button onclick="goBack()" class="backBtn">Back</button>
			</div>
		</div>
		`

  console.log(poke);
}



