import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import StarIcon from '@mui/icons-material/Star';

export const filterRatingsOptions = [
  { label: 'all', value: 'all' },
  { label: 'five', value: 5 },
  { label: 'four', value: 4 },
  { label: 'three', value: 3 },
  { label: 'two', value: 2 },
  { label: 'one', value: 1 },
];

export default function RatingsFilter(props) {
  const { filterRating, setRatingsFilter } = props;

  const handleChange = ({ target }) => setRatingsFilter(target.value);

  return (
    <Paper sx={{ paddingX: 2, paddingY: 1 }}>
      <Box sx={{ maxWidth: 120 }}>
        <FormControl variant="standard" fullWidth>
          <InputLabel id="rating-select-label">Rating</InputLabel>
          <Select
            labelId="rating-select-label"
            id="rating-select"
            value={filterRating}
            label="Rating"
            onChange={handleChange}
            sx={{ padding: 1 }}
          >
            {filterRatingsOptions.map((filterRatingOption, i) => (
              <MenuItem key={`filter-ratings-${i}`} value={filterRatingOption.value}>
                {filterRatingOption.label === 'all'
                  ? filterRatingOption.label.toUpperCase()
                  : [...Array(filterRatingOption.value)].map((_, i) => (
                      <StarIcon key={`${filterRatingOption.value}-star-${i}`} fontSize="xsmall" />
                    ))}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Paper>
  );
}
