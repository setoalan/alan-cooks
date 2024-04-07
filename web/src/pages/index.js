import * as React from 'react';
import { graphql } from 'gatsby';
import IngredientsFilter from '../components/IngredientsFilter';
import FavoritesPaper from '../components/FavoritesPaper';
import Pagination from '../components/Pagination';
import RatingsFilter from '../components/RatingsFilter';
import RecipeGrid from '../components/RecipeGrid';
import SEO from '../components/SEO';
import { PATHNAMES, RATING_CARDINALS, FILTER_RATING_DEFAULT } from '../constants';

export default function HomePage({ data, pageContext }) {
  const { totalCount, nodes: recipes } = data.recipes;
  const {
    ingredient,
    ingredientSlug,
    ingredientIcon,
    favorite,
    rating,
    pageSize = process.env.GATSBY_PAGE_SIZE,
    currentPage,
    skip,
  } = pageContext;

  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';

  const { FAVORITES, RATING } = PATHNAMES;

  let headerTitle = '';
  let paginationBase = '';

  if (favorite) {
    headerTitle = 'Favorites';
    paginationBase = FAVORITES;
  } else if (rating) {
    headerTitle = `${rating} Star${rating !== 1 ? 's' : ''}`;
    paginationBase = `${RATING}/${RATING_CARDINALS[rating]}`;
  } else if (ingredient) {
    headerTitle = ingredient;
    paginationBase = `/${ingredientSlug}`;
  }

  return (
    <>
      <SEO title={headerTitle} />
      {pathname.includes(FAVORITES) ? (
        <FavoritesPaper />
      ) : (
        <>
          <RatingsFilter activeRating={rating ?? FILTER_RATING_DEFAULT} />
          <IngredientsFilter activeIngredient={ingredient} activeIngredientIcon={ingredientIcon} />
        </>
      )}
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
            gatsbyImageData(width: 600, placeholder: BLURRED)
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
