import React, { useEffect, useState } from 'react';
import { Box, Accordion, AccordionSummary, AccordionDetails, CardContent, Typography, List, ListItem, ListItemText, CircularProgress, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import getData from '../utils/getData';

/**
 * Helper component to generate an accordion for a program (undergrad, grad, etc)
 * @param {String} degree Degree data  
 * @returns 
 */
function DegreeAccordion({ degree }) {
  return (
    <Accordion sx={{ mb: 2 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6" color="secondary">
          {degree.title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <CardContent>
          <Typography variant="body2" color="text.secondary" mb={2}>
            {degree.description}
          </Typography>
          <Divider sx={{ mb: 1 }} />
          <Typography variant="subtitle1" fontWeight="bold">
            Concentrations:
          </Typography>
          <List dense>
            {degree.concentrations.map((concentration) => (
              <ListItem disableGutters>
                <ListItemText primary={concentration} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </AccordionDetails>
    </Accordion>
  );
}

/**
 * Accordion for certificates (i.e. graduate)
 * @param {String} certificates certificate data input 
 * @returns 
 */
function CertificateList({ certificates }) {
  return (
    <Accordion sx={{ mb: 2 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6" color="secondary">
          Graduate Advanced Certificates
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List dense>
          {certificates.map((certificate) => (
            <ListItem disableGutters>
              <ListItemText primary={certificate} />
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}

function Degrees() {
  const [data, setData] = useState(null);

  // Fetch degrees data from the API
  useEffect(() => {
    getData('degrees/').then((json) => {
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
    <Box sx={{ padding: 4, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom color="primary">
        Programs
      </Typography>
      {/* Undergraduate Degrees Section */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5" color="primary">
            Undergraduate
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {data.undergraduate.map((degree) => (
            <DegreeAccordion degree={degree} />
          ))}
        </AccordionDetails>
      </Accordion>

      {/* Graduate Degrees Section */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5" color="primary">
            Graduate
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {data.graduate.map((degree) => (
            degree.degreeName === 'graduate advanced certificates' ? (
              <CertificateList certificates={degree.availableCertificates} />
            ) : (
              <DegreeAccordion degree={degree} />
            )
          ))}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default Degrees;
