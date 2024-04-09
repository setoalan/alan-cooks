import * as React from 'react';
import Box from '@mui/material/Box';
import ImageListItem, { imageListItemClasses } from '@mui/material/ImageListItem';
import RecipeGridItem from './RecipeGridItem';

export default function RecipeGrid({ recipes }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        },
        gridGap: {
          xs: 16,
          sm: 8,
        },
        [`& .${imageListItemClasses.root}`]: {
          display: 'flex',
          flexDirection: 'column',
        },
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
