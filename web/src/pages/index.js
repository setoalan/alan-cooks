import * as React from 'react';
import { graphql } from 'gatsby';
import RecipeGrid from '../components/RecipeGrid';
import IngredientsFilter from '../components/IngredientsFilter';
import Pagination from '../components/Pagination';
import RatingsFilter, { filterRatingsOptions } from '../components/RatingsFilter';

export default function HomePage({ data, pageContext }) {
  const { ingredient, pageSize = process.env.GATSBY_PAGE_SIZE, currentPage, skip } = pageContext;
  const activeIngredient = ingredient;
  const [filterRating, setRatingsFilter] = React.useState(filterRatingsOptions[0].value);
  const { totalCount } = data.recipes;
  let { nodes: recipes } = data.recipes;

  if (filterRating !== filterRatingsOptions[0].value) {
    recipes = recipes.filter(({ rating }) => rating === filterRating);
  }

  return (
    <>
      <RatingsFilter filterRating={filterRating} setRatingsFilter={setRatingsFilter} />
      <IngredientsFilter activeIngredient={activeIngredient} />
      <RecipeGrid recipes={recipes} />
      <Pagination pageSize={pageSize} totalCount={totalCount} currentPage={currentPage} skip={skip} base="page" />
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
