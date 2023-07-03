import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IngredientsFilterButton from './IngredientsFilterButton';

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

  const ingredientsWithCounts = getIngredientsWithCounts(recipes.nodes).sort((a, b) => b.name === activeIngredient);

  const ingredientsWithCountsSummary = ingredientsWithCounts.slice(0, 7);
  const ingredientsWithCountsDetails = ingredientsWithCounts.slice(8, ingredientsWithCounts.length - 1);

  return (
    <Accordion sx={{ mb: 2 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="ingredients-content" id="ingredients-header">
        <IngredientsFilterButton
          id="ingredients-all"
          icon="infinity"
          count={recipes.nodes.length}
          link="/"
          activeIngredient={activeIngredient}
        />
        {ingredientsWithCountsSummary.map((ingredient, i) => (
          <IngredientsFilterButton
            {...ingredient}
            key={`ingredients-filter-summary-${i}`}
            link={`/ingredient/${ingredient.name.toLowerCase()}`}
            activeIngredient={activeIngredient}
          />
        ))}
      </AccordionSummary>
      <AccordionDetails>
        {ingredientsWithCountsDetails.map((ingredient, i) => (
          <IngredientsFilterButton
            {...ingredient}
            key={`ingredients-filter-details-${i}`}
            link={`/ingredient/${ingredient.name.toLowerCase()}`}
            activeIngredient={activeIngredient}
          />
        ))}
      </AccordionDetails>
    </Accordion>
  );
}
