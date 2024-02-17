import * as React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { css } from '@emotion/css';

export default function RecipeGridItem({ recipe }) {
  const { name, date, image, favorite, ingredients, slug } = recipe;
  const dateOptions = { year: 'numeric', month: 'short', day: '2-digit' };
  const recipeDate = new Date(date).toLocaleDateString(undefined, dateOptions);
  const recipeImage = getImage(image.asset);

  return (
    <Link to={`/recipe/${slug.current}`}>
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
      <ImageListItemBar
        title={name}
        subtitle={`${recipeDate} • ${ingredients
          .map(({ name }) => name)
          .join(', ')
          .toLowerCase()}`}
        actionIcon={favorite && <FavoriteIcon sx={{ color: '#ffc107', marginRight: 2 }} />}
      />
    </Link>
  );
}
