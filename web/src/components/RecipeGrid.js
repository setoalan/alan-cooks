import * as React from 'react';
import Box from '@mui/material/Box';
import ImageListItem from '@mui/material/ImageListItem';
import RecipeGridItem from './RecipeGridItem';

export default function RecipeGrid({ recipes }) {
  return (
    <Box
      display="grid"
      gap={{
        xs: 2,
        sm: 1,
      }}
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
      }}
    >
      {recipes.map(recipe => (
        <ImageListItem key={recipe.id}>
          <RecipeGridItem recipe={recipe} />
        </ImageListItem>
      ))}
    </Box>
  );
}
