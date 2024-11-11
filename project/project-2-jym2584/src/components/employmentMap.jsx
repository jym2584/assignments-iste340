import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useState } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import Map, { Marker, Popup, GeolocateControl, FullscreenControl, NavigationControl, ScaleControl } from 'react-map-gl';
import Pin from '../components/pin';

const MAPBOX_TOKEN = 'pk.eyJ1IjoianltMjU4NCIsImEiOiJjbTNidmQ2dG0xbmEwMnFxMnN5OHY1cno5In0.y3sRzDtaqLXwcqnvFcPohw';

function EmploymentsMap({ coopTableData, employmentTableData, geoData }) {
    const [popupInfo, setPopupInfo] = useState(null);

    // Function to find coordinates and city/state by city name
    const getCoordinates = (city) => {
        if (!geoData) return null;

        const normalizeCity = (cityName) => {
            const parts = cityName.trim().split(' ');
            if (parts.length > 1 && parts[parts.length - 1].length === 2) {
                parts.pop(); // Remove state abbreviation (e.g., "NY", "PA")
            }
            return parts.join(' ').toUpperCase().trim();
        };

        const normalizedCity = normalizeCity(city);

        const location = geoData.find(
            (geo) => normalizeCity(geo.city) === normalizedCity
        );

        return location
            ? {
                latitude: parseFloat(location.latitude),
                longitude: parseFloat(location.longitude),
                city: location.city,
                state: location.state,
            }
            : null;
    };

    // Combine coop and employment data and group by coordinates
    const combinedData = [...coopTableData, ...employmentTableData];
    const groupedData = combinedData.reduce((acc, entry) => {
        const coordinates = getCoordinates(entry.city);
        if (!coordinates) return acc;

        const key = `${coordinates.latitude},${coordinates.longitude}`;
        if (!acc[key]) {
            acc[key] = { coordinates, entries: [] };
        }
        acc[key].entries.push(entry);

        return acc;
    }, {});

    // Instead of using useMemo, just generate pins directly
    const pins = Object.keys(groupedData).map((key) => {
        const { coordinates, entries } = groupedData[key];

        return (
            <Marker
                latitude={coordinates.latitude}
                longitude={coordinates.longitude}
                anchor="bottom"
                onClick={(e) => {
                    e.originalEvent.stopPropagation();
                    setPopupInfo({ coordinates, entries });
                }}
            >
                <Pin/>
            </Marker>
        );
    });


    return (
        <Box sx={{ width: '100%', height: '800px', marginTop: '20px', marginBottom: '130px' }}>
            <Typography variant="h3" color="primary" sx={{marginBottom: '20px'}}>
                Employment & Coop Map
            </Typography>
            <Map
                initialViewState={{
                    latitude: 40,
                    longitude: -100,
                    zoom: 0,
                    bearing: 0,
                    pitch: 0,
                }}
                mapStyle="mapbox://styles/mapbox/dark-v9"
                mapboxAccessToken={MAPBOX_TOKEN}
            >
                <GeolocateControl position="top-left" />
                <FullscreenControl position="top-left" />
                <NavigationControl position="top-left" />
                <ScaleControl position="bottom-left" />

                {pins}

                {popupInfo && (
                    <Popup
                        anchor="top"
                        latitude={popupInfo.coordinates.latitude}
                        longitude={popupInfo.coordinates.longitude}
                        onClose={() => setPopupInfo(null)}
                    >
                        <Box style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            <Typography variant="h6">
                                {popupInfo.coordinates.city}, {popupInfo.coordinates.state}
                            </Typography>
                            <Divider sx={{ my: 1 }} />
                            {popupInfo.entries.map((entry) => (
                                <Box>
                                    <Typography variant="body1">
                                        <b>Employer:</b> {entry.employer}
                                    </Typography>
                                    <Typography variant="body2">
                                        <b>Degree:</b> {entry.degree}
                                    </Typography>
                                    {entry.title && (
                                        <Typography variant="body2">
                                            <b>Title:</b> {entry.title}
                                        </Typography>
                                    )}
                                    {entry.startDate && (
                                        <Typography variant="body2">
                                            <b>Start Date:</b> {entry.startDate}
                                        </Typography>
                                    )}
                                    {entry.term && (
                                        <Typography variant="body2">
                                            <b>Term:</b> {entry.term}
                                        </Typography>
                                    )}
                                    <Divider sx={{ my: 1 }} />
                                    </Box>
                            ))}
                        </Box>
                    </Popup>
                )}

            </Map>
        </Box>
    );
}

export default EmploymentsMap;
