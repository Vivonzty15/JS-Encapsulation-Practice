// The array of ingredients the user can add to a sandwich
//  This will be updated after we fetch.
const ingredientList = {
    ingredients: [],

    // Updates the DOM to display a list of ingredients
    render: function() {
        const ingredientUl = document.querySelector('.ingredient-list');

        // Empty the ingredientList before adding any content to it.
        ingredientUl.innerHTML = '';

        ingredients.forEach(ingredient => {
            const ingredientDiv = this.renderIngredientCard(ingredient);
           ingredientUl.append(ingredientDiv)
        })
    },

    // Creates a DIV to display a single ingredient
    renderIngredientCard: function(ingredient) {
        const { name, calories, imageURL, description } = ingredient // destructured ingredient array
        const ingredientCard = document.createElement('div');
        ingredientCard.className = 'card'

        const sandwichHasIngredient = selectedSandwich.ingredients.includes(name);
        ingredientCard.innerHTML = `
            <div class="card-body">
                <div class="row g-0">
                    <div class="col-sm-4">
                        <img src="${imageURL}" alt="${name}" style="width: 100%">
                    </div>
                    <div class="col-sm-8">
                        <h5 class="card-title">${name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${calories} Calories</h6>
                        <p class="card-text">${description}</p>
                        ${sandwichHasIngredient ? `
                            <button class="btn btn-danger toggle-button">Remove</button>
                        ` : `
                            <button class="btn btn-primary toggle-button">Add</button>
                        `}
                    </div>
                </div>
            </div>
        `
        const toggleButton = ingredientCard.querySelector('.toggle-button')
        toggleButton.addEventListener('click', () => {
            this.toggleIngredient(ingredient)
        })

        return ingredientCard
    },

    // Runs when the user clicks 'Add' or 'Remove' on a ingredient card
    toggleIngredient: function(ingredient) {
        let sandwichHasIngredient = selectedSandwich.ingredients.includes(ingredient.name);
        if (sandwichHasIngredient) {
            selectedSandwich.ingredients = selectedSandwich.ingredients.filter(x => x !== ingredient.name)
        } else {
            sandwichHasIngredient = true;
            selectedSandwich.ingredients.push(ingredient.name)
        }
        cart.saveSelectedSandwich()
        cart.renderCart()
        this.render()
    },
}