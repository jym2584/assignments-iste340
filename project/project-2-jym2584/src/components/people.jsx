import React, { useEffect, useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Avatar, Typography, Box, Grid, Link, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CircularProgress } from '@mui/material';
import getData from '../utils/getData';

function People() {
  const [data, setData] = useState(null);

  // Fetch people data from the API
  useEffect(() => {
    getData('people/').then((json) => {
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
    <Box sx={{ padding: 2, maxWidth: '90%', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom color="primary" align="center">
        {data.title}
      </Typography>
      <Typography variant="subtitle1" align="center">
        {data.subTitle}
      </Typography>

      {/* Setup faculty data */}
      <Grid container spacing={2}>
        {data.faculty.map((facultyMember) => (
          <Grid item xs={12} sm={6} md={3}>
            <Accordion>
                {/* Faculty name and avatar */}
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Avatar
                  alt={facultyMember.name}
                  src={facultyMember.imagePath}
                  sx={{ width: 80, height: 80, marginRight: 1 }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Typography variant="h6">{facultyMember.name}</Typography>
                  {facultyMember.title && (
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {facultyMember.title}
                    </Typography>
                  )}
                </Box>
              </AccordionSummary>
                
                {/* Faculty information  */}
              <Divider/>
              <AccordionDetails>
                {facultyMember.interestArea && (
                  <Typography variant="body2">
                    <strong>Interests:</strong> {facultyMember.interestArea}
                  </Typography>
                )}
                {facultyMember.office && (
                  <Typography variant="body2">
                    <strong>Office:</strong> {facultyMember.office}
                  </Typography>
                )}
                {facultyMember.website && (
                  <Typography variant="body2">
                    <strong>Website:</strong> <Link href={facultyMember.website}>{facultyMember.website}</Link>
                  </Typography>
                )}
                {facultyMember.phone && (
                  <Typography variant="body2">
                    <strong>Phone:</strong> {facultyMember.phone}
                  </Typography>
                )}
                {facultyMember.email && (
                  <Typography variant="body2">
                    <strong>Email:</strong>{' '}
                    <Link href={`mailto:${facultyMember.email}`}>{facultyMember.email}</Link>
                  </Typography>
                )}
                {facultyMember.twitter && (
                  <Typography variant="body2">
                    <strong>Twitter:</strong> <Link href={`https://twitter.com/${facultyMember.twitter}`}>{facultyMember.twitter}</Link>
                  </Typography>
                )}
                {facultyMember.facebook && (
                  <Typography variant="body2">
                    <strong>Facebook:</strong> <Link href={`https://www.facebook.com/${facultyMember.facebook}`}>{facultyMember.facebook}</Link>
                  </Typography>
                )}
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default People;
