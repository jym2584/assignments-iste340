import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useState } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import Map, { Marker, Popup, GeolocateControl, FullscreenControl, NavigationControl, ScaleControl } from 'react-map-gl';
import Pin from '../components/pin';

/**
 * Normalize the city name by removing state abbreviations
 * @param {String} cityName city name (i.e. "Rochester, NY", "Rochester,") 
 * @returns 
 */
const normalizeCity = (cityName) => {
    const parts = cityName.trim().split(' ');

    // Remove state abbreviation (last part, typically 2 characters) if present
    if (parts.length > 1 && parts[parts.length - 1].length === 2) {
        parts.pop();
    }

    return parts.join(' ').toUpperCase().trim();
};

/**
 * Finds the coordinates for a given city from the geodata
 * @param {} city 
 * @param {*} geoData 
 * @returns 
 */
const getCoordinates = (city, geoData) => {
    if (!geoData) return null;

    const normalizedCity = normalizeCity(city);

    // Find the location by matching the normalized city name
    const location = geoData.find(geo => normalizeCity(geo.city) === normalizedCity);

    if (!location) return null;

    // Return the location details as an object with latitude, longitude, city, and state
    return {
        latitude: parseFloat(location.latitude),
        longitude: parseFloat(location.longitude),
        city: location.city,
        state: location.state
    };
};

/**
 * Groups grouped employment/coop data and geoloc data
 * @param {JSON} data grouped coop and employment data 
 * @param {*} geoData geoloc data
 * @returns 
 */
const groupByCoordinates = (data, geoData) => {
    return data.reduce((groupedData, entry) => {
        const coordinates = getCoordinates(entry.city, geoData);

        // Skip entry if coordinates are not found
        if (!coordinates) return groupedData;

        const key = `${coordinates.latitude},${coordinates.longitude}`;

        // Create a new group for this location if current coordinates haven't been stored already
        if (!groupedData[key]) {
            groupedData[key] = {
                coordinates,
                entries: []
            };
        }

        // Add entry to current coordinate list
        groupedData[key].entries.push(entry);

        return groupedData;
    }, {});
};

/**
 * Combines both coop/employment and geocoord data 
 * @param {*} coopTableData 
 * @param {*} employmentTableData 
 * @param {*} geoData 
 * @returns coordinate data for each employer (both coop and employment)
 */
const createGroupedData = (coopTableData, employmentTableData, geoData) => {
    const combinedData = [...coopTableData, ...employmentTableData];
    return groupByCoordinates(combinedData, geoData);
};

function EmploymentsMap({ coopTableData, employmentTableData, geoData }) {
    const [popupInfo, setPopupInfo] = useState(null);

    const groupedData = createGroupedData(coopTableData, employmentTableData, geoData);

    const pins = Object.keys(groupedData).map((key) => {
        const { coordinates, entries } = groupedData[key];

        return (
            <Marker
                key={key}
                latitude={coordinates.latitude}
                longitude={coordinates.longitude}
                anchor="bottom"
                onClick={(e) => {
                    e.originalEvent.stopPropagation();
                    setPopupInfo({ coordinates, entries });
                }}
            >
                <Pin />
            </Marker>
        );
    });

    return (
        <Box sx={{ width: '100%', height: '800px', marginTop: '20px', marginBottom: '130px' }}>
            <Typography variant="h3" color="primary" sx={{ marginBottom: '20px' }}>
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
                mapboxAccessToken='pk.eyJ1IjoianltMjU4NCIsImEiOiJjbTNidmQ2dG0xbmEwMnFxMnN5OHY1cno5In0.y3sRzDtaqLXwcqnvFcPohw'
            >
                <GeolocateControl position="top-left" />
                <FullscreenControl position="top-left" />
                <NavigationControl position="top-left" />
                <ScaleControl position="bottom-left" />
                {/* mapbox pin data */}
                {pins}
                
                {/* popups for pin data */}
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
                            {popupInfo.entries.map((entry, index) => (
                                <Box key={index}>
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
