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

async function createPages(params) {
  await createRecipePages(params);
}

module.exports = {
  createPages,
};
