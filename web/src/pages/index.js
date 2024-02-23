import * as React from 'react';
import { graphql } from 'gatsby';
import IngredientsFilter from '../components/IngredientsFilter';
import Pagination from '../components/Pagination';
import RatingsFilter, { DEFAULT_FILTER_RATING } from '../components/RatingsFilter';
import RecipeGrid from '../components/RecipeGrid';

const { useState } = React;

export default function HomePage({ data, pageContext }) {
  const { totalCount, nodes: recipes } = data.recipes;
  const {
    ingredient,
    ingredientSlug,
    rating,
    pageSize = process.env.GATSBY_PAGE_SIZE,
    currentPage,
    skip,
  } = pageContext;

  let paginationBase = '';
  if (ingredient) {
    paginationBase = `/${ingredientSlug}`;
  } else if (rating) {
    paginationBase = `/rating/${rating}`;
  }

  return (
    <>
      <RatingsFilter activeRating={rating ?? DEFAULT_FILTER_RATING} />
      <IngredientsFilter activeIngredient={ingredient} />
      <RecipeGrid recipes={recipes} />
      <Pagination
        totalCount={totalCount}
        pageSize={pageSize}
        currentPage={currentPage}
        skip={skip}
        base={paginationBase}
      />
    </>
  );
}

export const query = graphql`
  query ($ingredientRegex: String, $rating: Float, $pageSize: Int = 30, $skip: Int = 0) {
    recipes: allSanityRecipe(
      filter: { ingredients: { elemMatch: { name: { regex: $ingredientRegex } } }, rating: { eq: $rating } }
      limit: $pageSize
      skip: $skip
      sort: { date: DESC }
    ) {
      totalCount
      nodes {
        id
        name
        slug {
          current
        }
        date
        image {
          asset {
            gatsbyImageData(width: 400, placeholder: BLURRED)
          }
        }
        favorite
        rating
        ingredients {
          name
        }
      }
    }
  }
`;
