const resultContainer = document.getElementById("result");
const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const searchContainer = document.getElementById(".search-box");

// Url da api para pegar data das receitas

const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

// Event listeners pra procurar e inputa (quando o enter for pressionado)


searchBtn.addEventListener("click", searchMeal);
searchInput.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        searchMeal();
    }
});

// Função para buscar a comida

function searchMeal() {
    const userInput = searchInput.value.trim();
    if (!userInput) {
        resultContainer.innerHTML = `<h3> Campo de entrada não pode ser vazio</h3>`;
        return;
    }

    // Puxar data de comidas da api usando o input do usuario
    fetch(apiUrl + userInput).then((response) => response.json()).then((data) => {
        const meal = data.meals[0];
        // Para caso nenhuma comida for encontrada
        if (!meal) {
            resultContainer.innerHTML = `<h3> Infelizmente não achamos uma receita para essa comida, tente outra ;)</h3>`;
            return;
        }
        const ingredients = getIngredients(meal);
        // Gerar html pra soltar a receita
        const recipeHtml = `
            <div class="details">
                <h2>${meal.strMeal}</h2>
                <h4>${meal.strArea}</h4>
            </div>
            <img src=${meal.strMealThumb} alt=${meal.strMeal} />
            <div id="ingre-container">
                <h3> Ingredientes:</h3>
                <ul> ${ingredients}</ul>
            </div>
            <div id="recipe">
                <button id="hide-recipe">X</button>
                <pre id="instructions">${meal.strInstructions}</pre>
            </div>
            <button id="show-recipe"> Ver receita</button>
        `;
        resultContainer.innerHTML = recipeHtml;


        const hideRecipeBtn = document.getElementById("hide-recipe");
        hideRecipeBtn.addEventListener("click", hideRecipe);
        const showRecipeBtn = document.getElementById("show-recipe");
        showRecipeBtn.addEventListener("click", showRecipe);
        searchContainer.style.opacity = '0';
        searchContainer.style.display = 'none';
    })

    // Handle error
    .catch(() => {
        searchContainer.style.opacity = '1';
        searchContainer.style.display = 'grid';
        resultContainer.innerHTML = `<h3>Error fetching data!</h3>`;
    });
}


// Gerar html para lista de ingredientes

function getIngredients(meal) {
    let ingreHtml = "";
    // Máximo de 20 ingredientes

    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingreHtml += `<li> ${measure} ${ingredient}</li>`
        }

        // Se o ingrediente não existir, sair do loop
        else {
            break;
        }
    }
    return ingreHtml;
}

// Exibir e ocultar a receita
function hideRecipe() {
    const recipe = document.getElementById("recipe");
    recipe.style.display = "none";
}

function showRecipe() {
    const recipe = document.getElementById("recipe");
    recipe.style.display = "block;"
}