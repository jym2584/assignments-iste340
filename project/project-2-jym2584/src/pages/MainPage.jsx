import { Box, Typography, Paper, Grid2 as Grid } from "@mui/material";
import Carousel from 'react-material-ui-carousel';
import AboutComponent from "../components/about";
import Degrees from "../components/degrees";
import Minors from "../components/minors";

function CauroselComponent() {
    const items = [
        {
            imageUrl: 'https://cdn.rit.edu/images/program/2019-05/WebDevelopmentAdvCert.jpg'
        },
        {
            imageUrl: 'https://cdn.rit.edu/images/program/2019-01/DataScienceMS.jpg'
        },
        {
            imageUrl: 'https://cdn.rit.edu/images/program/2022-08/computing-and-information-technologies-bs_0.jpg'
        },
        {
            imageUrl: "https://cdn.rit.edu/images/program/2019-05/InformationSciencesandTechnologiesMS.jpg"
        },
        {
            imageUrl: "https://cdn.rit.edu/images/program/2019-01/ComputingandInformationSciencesPhD.jpg"
        }
    ];

    return (
        <Carousel>
            {items.map((item) => (
                <Paper
                    style={{
                        position: 'relative',
                        height: '450px',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    {/* Image */}
                    <img
                        src={item.imageUrl}
                        style={{ width: '100%', height: '450px', objectFit: 'cover' }}
                    />

                    {/* Text Overlay */}
                    <Box
                        style={{
                            position: 'absolute',
                            left: '2%',
                            top: '80%',
                            transform: 'translateY(-50%)',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            padding: '10px 20px',
                            borderRadius: '5px'
                        }}
                    >
                        <Typography
                            variant="h5"
                            style={{
                                color: '#fff',
                                fontWeight: 'bold',
                            }}
                        >
                            School of
                        </Typography>
                        <Typography
                            variant="h4"
                            style={{
                                color: '#fff',
                                fontWeight: 'bold',
                            }}
                        >
                            Information
                        </Typography>
                    </Box>
                </Paper>
            ))}
        </Carousel>
    );
}


function MainPage() {
    return (
        <Box>
            <CauroselComponent />
            <AboutComponent />
            <Grid container spacing={2} columns={16}>
                <Grid size={8}>
                    <Degrees />
                </Grid>
                <Grid size={8}>
                    <Minors />
                </Grid>
            </Grid>
        </Box>
    )
}

export default MainPage;