import * as React from 'react';
import RecipeCard from './RecipeCard';

export default function RecipeGrid({ recipes }) {
  return (
    <>
      {recipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </>
  );
}
