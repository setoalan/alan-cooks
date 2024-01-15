const path = require('path');

const homePage = path.resolve('./src/pages/index.js');
const recipeTemplate = path.resolve('./src/templates/Recipe.js');

async function createRecipePages({ graphql, actions }) {
  const { data } = await graphql(`
    query {
      recipes: allSanityRecipe {
        nodes {
          slug {
            current
          }
        }
      }
    }
  `);

  data.recipes.nodes.forEach(({ slug }) => {
    const { current } = slug;

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
  const { data } = await graphql(`
    query {
      ingredients: allSanityIngredient {
        nodes {
          name
        }
      }
    }
  `);

  data.ingredients.nodes.forEach(({ name }) => {
    actions.createPage({
      path: `ingredient/${name.toLowerCase()}`,
      component: homePage,
      context: {
        ingredient: name,
        ingredientRegex: `/${name.replace('+', '\\+')}/i`,
      },
    });
  });
}

async function turnRecipesIntoPages({ graphql, actions }) {
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
    if (i === 0) return;

    actions.createPage({
      path: `/page/${i + 1}`,
      component: homePage,
      context: {
        pageSize,
        currentPage: i + 1,
        skip: i * pageSize,
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
