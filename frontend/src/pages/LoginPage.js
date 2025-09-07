import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const baseUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

const LoginPage = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${baseUrl}/auth/google`;
  };

  const handleLinkedinLogin = () => {
    window.location.href = `${baseUrl}/auth/linkedin`;
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
      px={2}
    >
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>

      <Button
        variant="contained"
        fullWidth
        startIcon={<GoogleIcon />}
        onClick={handleGoogleLogin}
        sx={{
          bgcolor: '#4285F4',
          '&:hover': { bgcolor: '#357ae8' },
          color: 'white',
          mb: 2,
          maxWidth: 300,
          fontWeight: 'bold',
        }}
      >
        Login with Google
      </Button>

      <Button
        variant="contained"
        fullWidth
        startIcon={<LinkedInIcon />}
        onClick={handleLinkedinLogin}
        sx={{
          bgcolor: '#0077b5',
          '&:hover': { bgcolor: '#005582' },
          color: 'white',
          maxWidth: 300,
          fontWeight: 'bold',
        }}
      >
        Login with LinkedIn
      </Button>
    </Box>
  );
};

export default LoginPage;
