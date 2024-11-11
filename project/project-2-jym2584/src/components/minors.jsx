import React, { useEffect, useState } from 'react';
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Divider,
  CircularProgress,
  Popover,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import getData from '../utils/getData';

function Minors() {
  const [data, setData] = useState(null);

  // Fetch minors data from the endpoint
  useEffect(() => {
    getData('minors/').then((json) => {
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
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom color="primary">
        Undergraduate Minors
      </Typography>
      {data.UgMinors.map((minor) => (
        <MinorAccordion minor={minor} />
      ))}
    </Box>
  );
}

/**
 * Creates an accordion component for minor
 * @param {JSON} minor JSON data for minor 
 * @returns 
 */
function MinorAccordion({ minor }) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [courseDetails, setCourseDetails] = useState(null);
  const [anchorPosition, setAnchorPosition] = useState({ top: 0, left: 0 });

  /**
   * Get course details when a course is clicked
   * @param {*} event 
   * @param {*} courseID 
   */
  const handleCourseClick = (event, courseID) => {
    // Set anchor position
    const { clientX, clientY } = event;
    setAnchorPosition({ top: clientY, left: clientX });

    // Fetch data
    getData(`/course/courseID=${courseID}`).then((json) => {
      setCourseDetails(json);
      setIsPopoverOpen(true);
    });
  };

  /**
   * Popover close
   */
  const handleClose = () => {
    setIsPopoverOpen(false);
    setCourseDetails(null);
  };

  return (
    <Accordion sx={{ mb: 2 }}>
        {/* Minor detail */}
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6" color="secondary">
          {minor.title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        
        {/* Description */}
        <Typography variant="body2" mb={2}>
          {minor.description}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {/* Courses list */}
        <Typography variant="subtitle1" fontWeight="bold">
          Courses:
        </Typography>
          {minor.courses.map((course) => (
            <Button
              variant="text"
              onClick={(event) => handleCourseClick(event, course)}
            >
              {course}
            </Button>
          ))}

        {/* Minor note */}
        {minor.note && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2" color="text.secondary">
              Note:
            </Typography>
            <Typography variant="body2">{minor.note}</Typography>
          </>
        )}
      </AccordionDetails>

      {/* Course details popover */}
      <Popover
        open={isPopoverOpen}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={anchorPosition}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {courseDetails ? (
          <Box sx={{ padding: 2, maxWidth: 300 }}>
            <Typography variant="h6">{courseDetails.title} ({courseDetails.courseID})</Typography>
            <Divider/>
            <Typography variant="body2" mt={1}>
              {courseDetails.description}
            </Typography>
          </Box>
        ) : (
          <></>
        )}
      </Popover>
    </Accordion>
  );
}

export default Minors;
