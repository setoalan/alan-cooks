import * as React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { useTheme } from '@mui/material/styles';
import { css } from '@emotion/css';
import { PATHNAMES } from '../constants';

export default function RecipeGridItem({ recipe }) {
  const { name, slug, image, rating, favorite, challenge, ingredients } = recipe;

  const theme = useTheme();

  const recipeImage = getImage(image.asset);

  return (
    <Link to={`${PATHNAMES.RECIPE}/${slug.current}`}>
      <GatsbyImage
        image={recipeImage}
        alt={name}
        imgClassName={css`
          transition: all 0.5s ease-in-out !important;
          &:hover {
            transform: scale(1.5);
          }
        `}
        width={200}
        height={200}
      />
      {challenge ? (
        <ImageListItemBar
          title={challenge}
          position="top"
          sx={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
          }}
        />
      ) : null}
      <ImageListItemBar
        title={name}
        subtitle={`${rating} ⭐  • ${ingredients
          .map(({ name }) => name)
          .join(', ')
          .toLowerCase()}`}
        position="bottom"
        actionIcon={favorite ? <FavoriteIcon sx={{ mr: 2, color: theme.palette.favorite.main }} /> : null}
        sx={{
          [`& .MuiImageListItemBar-subtitle`]: {
            lineHeight: 1.2,
          },
        }}
      />
    </Link>
  );
}
