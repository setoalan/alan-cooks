import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Paper from '@mui/material/Paper';

const { Fragment } = React;

export const filterRatingsOptions = ['ALL', 5, 4, 3, 2, 1];
export const { 0: DEFAULT_FILTER_RATING } = filterRatingsOptions;

export default function RatingsFilter({ filterRating, setRatingsFilter }) {
  const handleClick = ({ target }) => {
    const { value } = target;
    setRatingsFilter(value === DEFAULT_FILTER_RATING ? value : parseInt(value));
  };

  return (
    <Paper sx={{ paddingX: 2, paddingY: 1 }}>
      <ButtonGroup variant="outlined" aria-label="outlined button group" fullWidth>
        {filterRatingsOptions.map((filterRatingOption, i) => (
          <Button
            key={`filter-rating-${i}`}
            variant={filterRating === filterRatingOption ? 'contained' : 'outlined'}
            value={filterRatingOption}
            onClick={handleClick}
          >
            {filterRatingOption === DEFAULT_FILTER_RATING
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
