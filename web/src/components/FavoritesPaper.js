import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

export default function FavoritesPaper() {
  const theme = useTheme();

  const { favoriteRecipes } = useStaticQuery(graphql`
    query {
      favoriteRecipes: allSanityRecipe(filter: { favorite: { eq: true } }) {
        totalCount
      }
    }
  `);

  return (
    <Tooltip
      title={
        <Typography>
          {favoriteRecipes.totalCount} {favoriteRecipes.totalCount === 1 ? 'favorite' : 'favorites'}
        </Typography>
      }
      placement="top"
    >
      <Paper square sx={{ height: 53, my: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <FavoriteIcon sx={{ color: theme.palette.favorite.main }} />
        <Typography mx={1} textTransform="uppercase">
          Alan's Favorites
        </Typography>
        <FavoriteIcon sx={{ color: theme.palette.favorite.main }} />
      </Paper>
    </Tooltip>
  );
}
