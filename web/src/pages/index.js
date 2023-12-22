import * as React from 'react';
import { graphql } from 'gatsby';
import RecipeGrid from '../components/RecipeGrid';
import IngredientsFilter from '../components/IngredientsFilter';
import RatingsFilter, { filterRatingsOptions } from '../components/RatingsFilter';

export default function HomePage({ data, pageContext, location }) {
  const activeIngredient = pageContext.ingredient;
  const [filterRating, setRatingsFilter] = React.useState(filterRatingsOptions[0].value);
  let recipes = data.recipes.nodes;

  if (filterRating !== filterRatingsOptions[0].value) {
    recipes = recipes.filter(({ rating }) => rating === filterRating);
  }

  return (
    <>
      <RatingsFilter filterRating={filterRating} setRatingsFilter={setRatingsFilter} />
      <IngredientsFilter activeIngredient={activeIngredient} />
      <RecipeGrid recipes={recipes} />
    </>
  );
}

export const query = graphql`
  query ($ingredientRegex: String) {
    recipes: allSanityRecipe(
      filter: { ingredients: { elemMatch: { name: { regex: $ingredientRegex } } } }
      sort: { date: DESC }
    ) {
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
