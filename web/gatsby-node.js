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
        ingredientRegex: `/${name.replace('+', '\\+')}/i`,
      },
    });
  });
}

async function turnRecipesIntoPages({ graphql, actions }) {
  const homePage = path.resolve('./src/pages/index.js');

  const { data } = await graphql(`
    query {
      recipes: allSanityRecipe {
        totalCount
      }
    }
  `);

  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.recipes.totalCount / pageSize);

  Array.from({ length: pageCount }).forEach((_, i) => {
    actions.createPage({
      path: `/page/${i + 1}`,
      component: homePage,
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });
}

async function createPages(params) {
  await Promise.all([createRecipePages(params), createIngredientPages(params), turnRecipesIntoPages(params)]);
}

module.exports = {
  createPages,
};
