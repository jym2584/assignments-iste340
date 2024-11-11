import React, { useEffect, useState } from 'react';
import { Typography, Box, CircularProgress, Grid, Card, CardMedia, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import getData from "../utils/getData";

function NewsPage() {
    const [data, setData] = useState(null);
    const [open, setOpen] = useState(false);
    const [selectedNews, setSelectedNews] = useState(null);
    const [selectedNewsIndex, setSelectedNewsIndex] = useState(null);

    useEffect(() => {
        getData('news/').then((json) => {
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


    const handleOpen = (newsItem, index) => {
        setSelectedNews(newsItem);
        setSelectedNewsIndex(index);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setSelectedNews(null);
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h3" sx={{ marginBottom: 2 }}>
                Latest News
            </Typography>

            {/* News Cards */}
            <Grid container spacing={3}>
                {data.older.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ height: '100%' }} onClick={() => handleOpen(item, index)}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={`https://picsum.photos/400/200?random=${index}`}
                                alt="News image"
                            />
                            <CardContent>
                                <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                                    {item.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
                                    {item?.date}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Modal for news with description */}
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>{selectedNews?.title} ({selectedNews?.date})</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img
                            src={`https://picsum.photos/400/200?random=${selectedNewsIndex}`}
                            alt="News image"
                            style={{ width: '100%', height: 'auto', marginBottom: 16 }}
                        />
                        <Typography variant="body1">{selectedNews?.description}</Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default NewsPage;
