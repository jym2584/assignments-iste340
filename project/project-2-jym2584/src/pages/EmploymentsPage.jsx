import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Grid2 as Grid,
    CircularProgress,
} from '@mui/material';
import getData from '../utils/getData';
import EmploymentTable from '../components/employmentTable';
import CoopTable from '../components/coopTable';
import Carousel from 'react-material-ui-carousel';
import EmploymentsMap from '../components/employmentMap';

function EmploymentsPage() {
    const [data, setData] = useState(null);
    const [geoData, setGeoData] = useState(null);

    useEffect(() => {
        getData('employment/').then((json) => {
            setData(json);
        })

        getData('location/').then((json) => {
            setGeoData(json);
        })
    }, []);

    // Show loading while data is still being fetched
    if (!data || !geoData) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }


    return (
        <Box>
            {/* Introduction */}
            <Box
                sx={{
                    position: 'relative',
                    height: '400px',
                    width: '100%',
                    backgroundImage: 'url(https://www.rit.edu/careerservices/sites/rit.edu.careerservices/files/images/paragraph/banner-item/co-op-banner.jpg)', // Image URL
                    backgroundSize: 'cover',
                    borderRadius: '8px',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '0',
                        width: '100%',
                        padding: '20px 0px',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        borderRadius: '5px 5px 0 0',
                    }}
                >
                    <Typography
                        variant="h4"
                        color="white"
                        sx={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                        }}
                    >
                        {data.introduction.title}
                    </Typography>
                </Box>
            </Box>

            {/* Employment desc */}
            <Grid container spacing={2} columns={16} sx={{ marginTop: '50px' }}>
                {data.introduction.content.map((element) => (
                    <Grid size={8}>
                        <Typography variant="h3">{element.title}</Typography>
                        <Typography>{element.description}</Typography>
                    </Grid>
                ))}
            </Grid>

            {/* Employment stats */}
            <Box sx={{
                marginTop: '100px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Typography variant="h3" color="primary">
                    {data.degreeStatistics.title}
                </Typography>
                <Grid container spacing={2} columns={16}>
                    {data.degreeStatistics.statistics.map((element) => (
                        <Grid size={4}>
                            <Box sx={{ padding: '30px', boxShadow: 1, minHeight: '100px' }}>
                                <Typography variant="h4" align="center" color="primary">{element.value}</Typography>
                                <Typography align="center">{element.description}</Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Featured employers and job titles */}
            <Box
                sx={{
                    marginTop: '100px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px'
                    }}
                >
                    <Typography variant="h3" color='primary'>Featured {data.employers.title} and {data.careers.title}</Typography>
                    <Carousel
                        cycleNavigation={true}
                        autoPlay={true}
                        interval={5000}
                        animation="slide"
                        indicators={false}
                        sx={{ maxWidth: '700px', padding: '20px' }}
                    >
                        {data.employers.employerNames.map((name) => (
                            <Paper sx={{ textAlign: 'center', boxShadow: 0 }}>
                                <Typography variant="h4">{name}</Typography>
                            </Paper>
                        ))}
                    </Carousel>
                    <Carousel
                        cycleNavigation={true}
                        autoPlay={true}
                        interval={2500}
                        animation="slide"
                        indicators={false}
                        sx={{ maxWidth: '700px', padding: '20px' }}
                    >
                        {data.careers.careerNames.map((name) => (
                            <Paper sx={{ textAlign: 'center', boxShadow: 0 }}>
                                <Typography variant="h5">{name}</Typography>
                            </Paper>
                        ))}
                    </Carousel>
                </Box>
            </Box>

            {/* Employment map */}
            <EmploymentsMap coopTableData={data.coopTable.coopInformation} employmentTableData={data.employmentTable.professionalEmploymentInformation} geoData={geoData} />

            {/* Coop and employment tables */}
            <Grid container spacing={2} columns={16}>
                <Grid size={8}>
                    <Typography color="primary" variant="h3"> {data.coopTable.title} </Typography>
                    <CoopTable coopData={data.coopTable.coopInformation} />
                </Grid>
                <Grid size={8}>
                    <Typography color="primary" variant="h3"> {data.employmentTable.title} </Typography>
                    <EmploymentTable employmentData={data.employmentTable.professionalEmploymentInformation} />
                </Grid>
            </Grid>
        </Box>
    )
}

export default EmploymentsPage;