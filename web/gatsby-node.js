const path = require('path');

async function createRecipePages({ graphql, actions }) {
  const recipeTemplate = path.resolve('./src/templates/Recipe.js');

  const { data } = await graphql(`
    query {
      recipes: allSanityRecipe {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);

  data.recipes.nodes.forEach(recipe => {
    const { current } = recipe.slug;

    actions.createPage({
      path: `recipe/${current}`,
      component: recipeTemplate,
      context: {
        slug: current,
      },
    });
  });
}

async function createIngredientPages({ graphql, actions }) {
  const ingredientTemplate = path.resolve('./src/pages/index.js');

  const { data } = await graphql(`
    query {
      ingredients: allSanityIngredient {
        nodes {
          id
          name
        }
      }
    }
  `);

  data.ingredients.nodes.forEach(({ name }) => {
    actions.createPage({
      path: `ingredient/${name.toLowerCase()}`,
      component: ingredientTemplate,
      context: {
        ingredient: name,
        ingredientRegex: `/${name}/i`,
      },
    });
  });
}

async function createPages(params) {
  await Promise.all([createRecipePages(params), createIngredientPages(params)]);
}

module.exports = {
  createPages,
};
