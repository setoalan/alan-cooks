import * as React from 'react';
import { Link } from 'gatsby';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Paper from '@mui/material/Paper';
import { filterRatingOptions, ratingCardinals, FILTER_RATING_DEFAULT } from '../constants';

const { Fragment } = React;

export default function RatingsFilter({ activeRating }) {
  return (
    <Paper sx={{ px: { xs: 1, md: 2 }, py: 1 }}>
      <ButtonGroup variant="outlined" aria-label="Ratings Filter" fullWidth>
        {filterRatingOptions.map((filterRatingOption, i) => (
          <Button
            key={`filter-rating-${i}`}
            component={Link}
            to={filterRatingOption === FILTER_RATING_DEFAULT ? '/' : `/rating/${ratingCardinals[filterRatingOption]}`}
            variant={activeRating === filterRatingOption ? 'contained' : 'outlined'}
            value={filterRatingOption}
          >
            {filterRatingOption === FILTER_RATING_DEFAULT
              ? filterRatingOption
              : [...Array(filterRatingOption)].map((_, i) => (
                  <Fragment key={`${filterRatingOption}-star-${i}`}>★</Fragment>
                ))}
          </Button>
        ))}
      </ButtonGroup>
    </Paper>
  );
}
