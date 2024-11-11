import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CircularProgress, Typography, Divider } from '@mui/material';
import getData from '../utils/getData';


function AboutComponent() {
    const [data, setData] = useState(null);
    
    // Fetch about data from the API
    useEffect(() => {
      getData('about/').then((json) => {
        setData(json);
      });
    }, []);
  
  // Show loading while data is still being fetched
  if (!data) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }
  
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '20px',
        }}
      >
        <Card sx={{ padding: 4}}>
          <CardContent>
            {/* Title */}
            <Box display="flex" alignItems="center" mb={2}>
              <Typography variant="h4" component="h1" color="primary">
                {data.title}
              </Typography>
            </Box>
            
            {/* Description */}
            <Typography variant="body1" color="text.secondary" mb={3}>
              {data.description}
            </Typography>
  
            <Divider sx={{ marginY: 3 }} />
  
            {/* Quote Section */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" fontStyle="italic" color="text.primary" mb={1}>
                "{data.quote}"
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {data.quoteAuthor}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    );
  }
  


export default AboutComponent;