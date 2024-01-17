import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import StarIcon from '@mui/icons-material/Star';

export const filterRatingsOptions = ['ALL', 5, 4, 3, 2, 1];

export default function RatingsFilter({ filterRating, setRatingsFilter }) {
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
              <MenuItem key={`filter-ratings-${i}`} value={filterRatingOption}>
                {filterRatingOption === 'ALL'
                  ? filterRatingOption
                  : [...Array(filterRatingOption)].map((_, i) => (
                      <StarIcon key={`${filterRatingOption}-star-${i}`} fontSize="xsmall" />
                    ))}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Paper>
  );
}
