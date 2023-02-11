const search = document.getElementById('search')
const submit = document.getElementById('submit-btn')
const resultMeal = document.getElementById('resultHeading')
const mealSel = document.getElementById('meals')
const singleMeals = document.getElementById('single-meals')
// search meal and api
function searchMeal (e) {
  e.preventDefault()

  const item = search.value
  // test input
  // console.log(item)

  if (item.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)

        if (data.meals === null) {
          resultMeal.innerHTML = ' <p> try again, enter vaild request </p> '
        } else {
          mealSel.innerHTML = data.meals.map(meal => `
          <div class="meal-info" data-mealId = '${meal.idMeal}'>
           <img src='${meal.strMealThumb}' alt='${meal.strMeal}' />
              <h3>${meal.strMeal} </h3>
           </div>
           </div>
       `)
            .join('')
        }
      })
    search.value = ''
  }
}

submit.addEventListener('submit', searchMeal)

function getMealId (mealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(res => res.json())
    .then(data => {
      console.log(data)

      const meal = data.meals[0]
      addMealToDom(meal)
    })
}

function addMealToDom (meal) {
  const ingredient = []
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredient.push(`${meal[`strIngredient${i}`]}-${meal[`strMeasure${i}`]}`)
    } else {
      break
    }
  }
  singleMeals.innerHTML = `
  <div class = 'singleMeal'>
  <h1> ${meal.strMeal} </h1>
  <img src= '${meal.strMealThumb}' alt='${meal.strMeal}' />
  <div class = 'singleMealInfo'>
   ${meal.strCategory ? `${meal.strCategory}` : ''} <br>
   ${meal.strArea ? `${meal.strArea}` : ''}
  </div>
  <div class = 'main'>
   <p>${meal.strInstructions} </p>
   <h2> ingredients </h2>
   <ul>
    ${ingredient.map(ing => `
    <li>
    ${ing}
    </li>`).join('')}
   </ul>
  </div>
  </div>
  `
}

mealSel.addEventListener('click', e => {
  const mealInfo = e.path.find(item => {
    if (item.classList) {
      return item.classList.contains('meal-info')
    } else {
      return false
    }
  })
  if (mealInfo) {
    const mealId = mealInfo.getAttribute('data-mealid')
    getMealId(mealId)
  }
})
