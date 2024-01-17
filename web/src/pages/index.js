import * as React from 'react';
import { graphql } from 'gatsby';
import RecipeGrid from '../components/RecipeGrid';
import IngredientsFilter from '../components/IngredientsFilter';
import Pagination from '../components/Pagination';
import RatingsFilter, { filterRatingsOptions } from '../components/RatingsFilter';

const { useState } = React;
const { 0: DEFAULT_FILTER } = filterRatingsOptions;

export default function HomePage({ data, pageContext }) {
  const { totalCount } = data.recipes;
  const { ingredient, pageSize = process.env.GATSBY_PAGE_SIZE, currentPage, skip } = pageContext;
  const [filterRating, setRatingsFilter] = useState(DEFAULT_FILTER);
  let { nodes: recipes } = data.recipes;

  if (filterRating !== DEFAULT_FILTER) {
    recipes = recipes.filter(({ rating }) => rating === filterRating);
  }

  return (
    <>
      <RatingsFilter filterRating={filterRating} setRatingsFilter={setRatingsFilter} />
      <IngredientsFilter activeIngredient={ingredient} />
      <RecipeGrid recipes={recipes} />
      <Pagination
        totalCount={totalCount}
        pageSize={pageSize}
        currentPage={currentPage}
        skip={skip}
        base={ingredient ? `ingredient/${ingredient.toLowerCase()}` : ''}
      />
    </>
  );
}

export const query = graphql`
  query ($ingredientRegex: String, $pageSize: Int = 30, $skip: Int = 0) {
    recipes: allSanityRecipe(
      filter: { ingredients: { elemMatch: { name: { regex: $ingredientRegex } } } }
      limit: $pageSize
      skip: $skip
      sort: { date: DESC }
    ) {
      totalCount
      nodes {
        id
        name
        slug {
          current
        }
        date
        image {
          asset {
            gatsbyImageData(width: 400, placeholder: BLURRED)
          }
        }
        favorite
        rating
        ingredients {
          name
        }
      }
    }
  }
`;
