import {
    Typography,
    Grid,
    Card,
    CardContent,
    Chip,
    Box
  } from '@mui/material'
  import { getSizeChipColor } from '../utils/thoughtUtils'
  
  const thoughtGrid = ({ thought, thoughtFilter }) => {
    if (thought.length === 0) {
      return (
        <Typography>
          {colorFilter ? `No ${colorFilter.toLowerCase()} thoughts found` : 'No thoughts yet'}
        </Typography>
      )
    }
  
    return (
      <Box>
        <Typography variant="h5">
          {colorFilter ? `${colorFilter} (${thought.length})` : `All Thoughts (${thought.length})`}
        </Typography>
        <Grid container spacing={2}>
          {thought.map((thought, index) => (
            <Grid item xs={12} sm={6} md={3} lg={3} xl={3} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{thought.name}</Typography>
                  <Chip label={thought.color} color="primary" />
                  {thought.size && (
                    <Chip
                      label={thought.size}
                      sx={{ color: getSizeChipColor(thought.size) }}
                    />
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    )
  }
  
  export default ThoughtGrid 