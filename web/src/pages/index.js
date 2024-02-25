import * as React from 'react';
import { graphql } from 'gatsby';
import IngredientsFilter from '../components/IngredientsFilter';
import Pagination from '../components/Pagination';
import RatingsFilter from '../components/RatingsFilter';
import RecipeGrid from '../components/RecipeGrid';
import SEO from '../components/SEO';
import { ratingCardinals, FILTER_RATING_DEFAULT } from '../constants';

const { useState } = React;

export default function HomePage({ data, pageContext }) {
  const { totalCount, nodes: recipes } = data.recipes;
  const {
    ingredient,
    ingredientSlug,
    favorite,
    rating,
    pageSize = process.env.GATSBY_PAGE_SIZE,
    currentPage,
    skip,
  } = pageContext;

  let headerTitle = '';
  let paginationBase = '';

  if (favorite) {
    headerTitle = 'Favorites';
    paginationBase = '/favorites';
  } else if (rating) {
    headerTitle = rating;
    paginationBase = `/rating/${ratingCardinals[rating]}`;
  } else if (ingredient) {
    headerTitle = ingredient;
    paginationBase = `/${ingredientSlug}`;
  }

  return (
    <>
      <SEO title={headerTitle} />
      <RatingsFilter activeRating={rating ?? FILTER_RATING_DEFAULT} />
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
  query ($favorite: Boolean, $rating: Float, $ingredientRegex: String, $pageSize: Int = 30, $skip: Int = 0) {
    recipes: allSanityRecipe(
      filter: {
        favorite: { eq: $favorite }
        rating: { eq: $rating }
        ingredients: { elemMatch: { name: { regex: $ingredientRegex } } }
      }
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
