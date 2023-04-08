import * as React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import StarIcon from '@mui/icons-material/Star';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { css } from '@emotion/css';

export default function RecipeListItem({ recipe }) {
  const dateOptions = { year: 'numeric', month: 'short', day: '2-digit' };
  const date = new Date(recipe.date).toLocaleDateString(undefined, dateOptions);
  const image = getImage(recipe.image.asset);

  return (
    <Link to={`/recipe/${recipe.slug.current}`}>
      <GatsbyImage
        image={image}
        alt={recipe.name}
        imgClassName={css`
          transition: all 0.5s ease-in-out !important;
          &:hover {
            transform: scale(1.5);
          }
        `}
      />
      <ImageListItemBar
        title={recipe.name}
        subtitle={`${date} • ${recipe.ingredients
          .map(ingredient => ingredient.name)
          .join(', ')
          .toLowerCase()}`}
        actionIcon={recipe.favorite && <StarIcon sx={{ color: '#ffc107', marginRight: 1 }} />}
      >
        <StarIcon />
      </ImageListItemBar>
    </Link>
  );
}
