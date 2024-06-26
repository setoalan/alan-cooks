import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IngredientsFilterButton from './IngredientsFilterButton';

const getIngredientsWithCounts = (recipes) => {
  const ingredientCounts = recipes
    .map(({ ingredients }) => ingredients)
    .flat()
    .reduce((acc, { id, name, slug, icon }) => {
      const existingIngredient = acc[id];

      if (existingIngredient) {
        existingIngredient.count += 1;
      } else {
        acc[id] = {
          id,
          name,
          slug,
          icon,
          count: 1,
        };
      }

      return acc;
    }, {});

  return Object.values(ingredientCounts).sort((a, b) => b.count - a.count);
};

export default function IngredientsFilter({ activeIngredient, activeIngredientIcon }) {
  const { recipes } = useStaticQuery(graphql`
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

  const ingredientsWithCounts = [
    ...[
      {
        id: 'ingredients-all',
        name: 'All ingredients',
        icon: 'infinity',
        count: recipes.nodes.length,
      },
    ],
    ...getIngredientsWithCounts(recipes.nodes),
  ];

  return (
    <Accordion sx={{ mt: 1, mb: 2 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="ingredients-content"
        id="ingredients-header"
        sx={{ height: 53, px: { xs: 1, md: 2 } }}
      >
        <Tooltip title={<Typography>Filter by ingredient</Typography>} placement="top">
          <Box display="flex" alignItems="center" justifyContent="center" width="100%" ml="21px">
            <img
              src={`https://img.icons8.com/color/24/null/${activeIngredientIcon || 'infinity'}.png`}
              alt={activeIngredientIcon}
              loading="lazy"
            />
            <Typography mx={1}>{activeIngredient?.toUpperCase() || 'ALL INGREDIENTS'}</Typography>
            <img
              src={`https://img.icons8.com/color/24/null/${activeIngredientIcon || 'infinity'}.png`}
              alt={activeIngredientIcon}
              loading="lazy"
            />
          </Box>
        </Tooltip>
      </AccordionSummary>
      <AccordionDetails>
        {ingredientsWithCounts.map((ingredient, i) => (
          <IngredientsFilterButton
            {...ingredient}
            key={`ingredients-filter-details-${i}`}
            activeIngredient={activeIngredient}
          />
        ))}
      </AccordionDetails>
    </Accordion>
  );
}
