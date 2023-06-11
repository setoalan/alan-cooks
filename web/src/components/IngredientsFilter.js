import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import Button from '@mui/material/Button';

function getIngredientsWithCounts(recipes) {
  const ingredientCounts = recipes
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
          icon,
          count: 1,
        };
      }

      return acc;
    }, {});

  return Object.values(ingredientCounts).sort((a, b) => b.count - a.count);
}

export default function IngredientsFilter({ activeIngredient }) {
  const { recipes } = useStaticQuery(graphql`
    query {
      recipes: allSanityRecipe {
        nodes {
          ingredients {
            id
            name
            icon
          }
        }
      }
    }
  `);

  const ingredientsWithCounts = getIngredientsWithCounts(recipes.nodes);

  return (
    <>
      <Link to="/">
        <Button
          startIcon={<img src={`https://img.icons8.com/color/24/null/infinity.png`} alt="infinity" />}
          variant={activeIngredient === undefined ? 'contained' : 'text'}
        >
          ALL {recipes.nodes.length}
        </Button>
      </Link>
      {ingredientsWithCounts.map(({ id, name, icon, count }) => (
        <Link key={id} to={`/ingredient/${name.toLowerCase()}`}>
          <Button
            startIcon={<img src={`https://img.icons8.com/color/24/null/${icon}.png`} alt={icon} />}
            variant={activeIngredient === name ? 'contained' : 'text'}
          >
            {name} {count}
          </Button>
        </Link>
      ))}
    </>
  );
}
