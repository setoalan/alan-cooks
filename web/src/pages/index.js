import * as React from 'react';
import { graphql } from 'gatsby';
import RecipeGrid from '../components/RecipeGrid';

export default function HomePage({ data }) {
  const recipes = data.recipes.nodes;

  return (
    <>
      <h1>Alan Cooks</h1>
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
        ingredients {
          name
        }
        image {
          asset {
            gatsbyImageData(width: 400, placeholder: BLURRED)
          }
        }
      }
    }
  }
`;
