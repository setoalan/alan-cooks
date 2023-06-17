import * as React from 'react';
import { graphql } from 'gatsby';
import RecipeGrid from '../components/RecipeGrid';
import IngredientsFilter from '../components/IngredientsFilter';

export default function HomePage({ data, pageContext }) {
  const activeIngredient = pageContext.ingredient;
  const recipes = data.recipes.nodes;

  return (
    <>
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
        ingredients {
          name
        }
      }
    }
  }
`;
