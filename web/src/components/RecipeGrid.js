import * as React from 'react';
import Box from '@mui/material/Box';
import ImageListItem, { imageListItemClasses } from '@mui/material/ImageListItem';
import RecipeListItem from './RecipeListItem';

export default function RecipeGrid({ recipes }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(2, 1fr)',
          sm: 'repeat(3, 1fr)',
        },
        gridGap: 4,
        [`& .${imageListItemClasses.root}`]: {
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {recipes.map(recipe => (
        <ImageListItem key={recipe.id}>
          <RecipeListItem recipe={recipe} />
        </ImageListItem>
      ))}
    </Box>
  );
}
