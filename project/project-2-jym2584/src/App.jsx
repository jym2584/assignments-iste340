import { useState } from 'react'
import './App.css'
import getData from './utils/getData.js';
import { useEffect } from 'react';

import { Box, Toolbar, Typography, AppBar, Button, Grid2 as Grid, Divider, IconButton, CircularProgress, Link } from '@mui/material';


import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';


import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import MainPage from './pages/MainPage.jsx';
import CoursesPage from './pages/CoursesPage.jsx';
import EmploymentsPage from './pages/EmploymentsPage.jsx';
import StaffDirectoryPage from './pages/StaffDirectory.jsx';
import NewsPage from './pages/NewsPage.jsx';

// App bar settings;
const appBarHeight = '64px';

function NavigationButton({ path, text }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Navigating to:", path);
    if (path.startsWith('http://') || path.startsWith('https://')) {
      window.open(path, '_blank', 'noopener,noreferrer');
    } else {
      navigate(path);
    }
  };

  return (
    <Button color="inherit" onClick={() => handleClick()}>{text}</Button>
  );
}

function WebsiteAppBar() {
  return (
    <AppBar
      color="primary"
      position="fixed"
      sx={{
        height: appBarHeight
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          iSchool
        </Typography>
        <Box sx={{ flexGrow: 1 }} /> {/* This will push the buttons to the right */}
        <NavigationButton path="/" text="Home" />
        <NavigationButton path="/courses" text="Courses" />
        <NavigationButton path="/employment" text="Employment" />
        <NavigationButton path="/staff" text="Staff Directory" />
        <NavigationButton path="/news" text="News" />
      </Toolbar>
    </AppBar>
  )
}

function WebsiteFooter() {
  const [data, setData] = useState(null);

  // Fetch footer data from the API
  useEffect(() => {
    getData('footer/').then((json) => {
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
        padding: 10,
      }}
    >
      <Divider sx={{ backgroundColor: 'gray', marginBottom: 2 }} />

      {/* Social Presence */}
      <Grid container size={12} spacing={4} sx={{ marginBottom: 4 }}>
        <Grid item size={4}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {data.social.title}
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 1 }}>
            {data.social.tweet}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {data.social.by}
          </Typography>
          <Box sx={{ marginTop: 2 }}>
            <IconButton color="primary" href={data.social.twitter} target="_blank">
              <TwitterIcon />
            </IconButton>
            <IconButton color="primary" href={data.social.facebook} target="_blank">
              <FacebookIcon />
            </IconButton>
          </Box>
        </Grid>

        {/* Quick Links */}
        <Grid item size={4}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Quick Links
          </Typography>
          <Box>
            {data.quickLinks.map((link) => (
              <Link
                href={link.href}
                variant="body2"
                color="inherit"
                sx={{ display: 'block', marginBottom: 1 }}
              >
                {link.title}
              </Link>
            ))}
            <Link variant="body2" href={data.news} color="inherit" target="_blank">Latest News</Link>
          </Box>

        </Grid>

        {/* Copyright */}
        <Grid item size={4}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {data.copyright.title}
          </Typography>
          <Typography>
            <Box
              dangerouslySetInnerHTML={{ __html: data.copyright.html }}
              sx={{ marginTop: 2 }}
            />
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

function App() {
  return (
    <>
      <Box>
        <WebsiteAppBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: `${appBarHeight}` }} >
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/employment" element={<EmploymentsPage />} />
            <Route path="/staff" element={<StaffDirectoryPage />} />
            <Route path="/news" element={<NewsPage />} />
          </Routes>
        </Box>
      </Box>
      <WebsiteFooter />
    </>
  )
}

export default App;