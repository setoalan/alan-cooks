import * as React from 'react';
import { graphql } from 'gatsby';
import RecipeGrid from '../components/RecipeGrid';
import IngredientsFilter from '../components/IngredientsFilter';

export default function HomePage({ data }) {
  const recipes = data.recipes.nodes;

  return (
    <>
      <IngredientsFilter />
      <RecipeGrid recipes={recipes} />
    </>
  );
}

export const query = graphql`
  query {
    recipes: allSanityRecipe(sort: { order: DESC, fields: date }) {
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
