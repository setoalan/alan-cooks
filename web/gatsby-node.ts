import path from 'path';

const HomePage = path.resolve('./src/pages/index.js');
const RecipeTemplate = path.resolve('./src/templates/Recipe.js');

const RATING_CARDINALS = {
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
};

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
      component: RecipeTemplate,
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
      component: HomePage,
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
        nodes {
          ingredients {
            id
            name
            slug {
              current
            }
            icon
          }
        }
      }
    }
  `);

  const ingredientCounts = recipeData.recipes.nodes
    .map(({ ingredients }) => ingredients)
    .flat()
    .reduce((acc, { id, name, slug, icon }) => {
      const existingIngredient = acc[id];

      if (existingIngredient) {
        existingIngredient.count += 1;
      } else {
        acc[id] = {
          name,
          slug,
          count: 1,
          icon,
        };
      }

      return acc;
    }, {});

  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);

  Object.values(ingredientCounts).forEach(({ name, slug, count, icon }) => {
    const pageCount = Math.ceil(count / pageSize);

    Array.from({ length: pageCount }).forEach((_, i) => {
      const { current } = slug;
      const basePath = `ingredient/${current}`;

      actions.createPage({
        path: i === 0 ? basePath : `${basePath}/page/${i + 1}`,
        component: HomePage,
        context: {
          ingredient: name,
          ingredientRegex: `/${name.replace('+', '\\+')}/i`,
          ingredientSlug: basePath,
          ingredientIcon: icon,
          pageSize,
          currentPage: i + 1,
          skip: i * pageSize,
        },
      });
    });
  });
}

async function createRatingFilterGridPages({ graphql, actions }) {
  const { data: recipeData } = await graphql(`
    query {
      recipes: allSanityRecipe {
        nodes {
          rating
          favorite
        }
      }
    }
  `);

  const favoritesCount = recipeData.recipes.nodes.filter(({ favorite }) => favorite).length;

  const ratingCounts = recipeData.recipes.nodes
    .map(({ rating }) => rating)
    .flat()
    .reduce((acc, value) => {
      const existingRating = acc[value];

      if (existingRating) {
        acc[value]++;
      } else {
        acc[value] = 1;
      }

      return acc;
    }, {});

  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);

  const favoritesPageCount = Math.ceil(favoritesCount / pageSize);

  Array.from({ length: favoritesPageCount }).forEach((_, i) => {
    const basePath = 'favorites';

    actions.createPage({
      path: i === 0 ? basePath : `${basePath}/page/${i + 1}`,
      component: HomePage,
      context: {
        favorite: true,
        pageSize,
        currentPage: i + 1,
        skip: i * pageSize,
      },
    });
  });

  Object.values(ratingCounts).forEach((value, i) => {
    const ratingPageCount = Math.ceil(value / pageSize);
    const ratingValue = i + 1;

    Array.from({ length: ratingPageCount }).forEach((_, j) => {
      const basePath = `rating/${RATING_CARDINALS[ratingValue]}`;

      actions.createPage({
        path: j === 0 ? basePath : `${basePath}/page/${j + 1}`,
        component: HomePage,
        context: {
          rating: ratingValue,
          pageSize,
          currentPage: j + 1,
          skip: j * pageSize,
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
    createRatingFilterGridPages(params),
  ]);
}

export { createPages };
