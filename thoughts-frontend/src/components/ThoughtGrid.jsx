import {
    Typography,
    Grid,
    Card,
    CardContent,
    Chip,
    Box
  } from '@mui/material'
  import { getSizeChipColor } from '../utils/thoughtsUtils'
  
  const ThoughtsGrid = ({ thoughts, thoughtsFilter }) => {
    if (thoughts.length === 0) {
      return (
        <Typography>
          {colorFilter ? `No ${colorFilter.toLowerCase()} thoughts found` : 'No thoughts yet'}
        </Typography>
      )
    }
  
    return (
      <Box>
        <Typography variant="h5">
          {colorFilter ? `${colorFilter} Thoughts` : 'All Thoughts'} ({thoughts.length})
        </Typography>
        <Grid container spacing={2}>
          {thoughts.map((thoughts, index) => (
            <Grid item xs={12} sm={6} md={3} lg={3} xl={3} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{thought.name}</Typography>
                  <Chip label={thought.color} color="primary" />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
          </Box>
        )
      }
      
      export default ThoughtsGrid
                  
              
      