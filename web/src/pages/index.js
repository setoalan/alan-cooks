import * as React from 'react';
import { graphql } from 'gatsby';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IngredientsFilter from '../components/IngredientsFilter';
import Pagination from '../components/Pagination';
import RatingsFilter from '../components/RatingsFilter';
import RecipeGrid from '../components/RecipeGrid';
import SEO from '../components/SEO';
import { ratingCardinals, FILTER_RATING_DEFAULT } from '../constants';

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

  let headerTitle = '';
  let paginationBase = '';

  if (favorite) {
    headerTitle = 'Favorites';
    paginationBase = '/favorites';
  } else if (rating) {
    headerTitle = `${rating} Star${rating !== 1 ? 's' : ''}`;
    paginationBase = `/rating/${ratingCardinals[rating]}`;
  } else if (ingredient) {
    headerTitle = ingredient;
    paginationBase = `/${ingredientSlug}`;
  }

  return (
    <>
      <SEO title={headerTitle} />
      {pathname.includes('/favorites') ? (
        <Paper
          square
          sx={{ alignItems: 'center', mt: 1, mb: 2, height: 48, display: 'flex', justifyContent: 'center' }}
        >
          <FavoriteIcon sx={{ color: '#ffc107' }} />
          <Typography sx={{ mx: 1 }}>ALAN'S FAVORITES</Typography>
          <FavoriteIcon sx={{ color: '#ffc107' }} />
        </Paper>
      ) : (
        <>
          <RatingsFilter activeRating={rating ?? FILTER_RATING_DEFAULT} />{' '}
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
