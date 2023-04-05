import * as React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

export default function RecipeCard({ recipe }) {
  const image = getImage(recipe.image.asset);

  return (
    <>
      <Link to={`/recipe/${recipe.slug.current}`}>
        <h2>{recipe.name}</h2>
      </Link>
      <p>{recipe.ingredients.map(ingredient => ingredient.name).join(', ')}</p>
      <GatsbyImage image={image} alt={recipe.name} />
    </>
  );
}
