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

async function createRecipeGridPages({ graphql, actions }) {
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

async function createIngredientFilterGridPages({ graphql, actions }) {
  const { data: recipeData } = await graphql(`
    query {
      recipes: allSanityRecipe {
        totalCount
        nodes {
          ingredients {
            id
            name
          }
        }
      }
    }
  `);

  const ingredientCounts = recipeData.recipes.nodes
    .map(({ ingredients }) => ingredients)
    .flat()
    .reduce((acc, { id, name, icon }) => {
      const existingIngredient = acc[id];

      if (existingIngredient) {
        existingIngredient.count += 1;
      } else {
        acc[id] = {
          id,
          name,
          count: 1,
        };
      }

      return acc;
    }, {});

  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);

  Object.values(ingredientCounts).forEach(({ name, count }) => {
    const pageCount = Math.ceil(count / pageSize);

    Array.from({ length: pageCount }).forEach((_, i) => {
      const basePath = `ingredient/${name.toLowerCase()}`;

      actions.createPage({
        path: i === 0 ? basePath : `${basePath}/page/${i + 1}`,
        component: homePage,
        context: {
          ingredient: name,
          ingredientRegex: `/${name.replace('+', '\\+')}/i`,
          pageSize,
          currentPage: i + 1,
          skip: i * pageSize,
        },
      });
    });
  });
}

async function createPages(params) {
  await Promise.all([
    createRecipePages(params),
    createRecipeGridPages(params),
    createIngredientFilterGridPages(params),
  ]);
}

module.exports = {
  createPages,
};
