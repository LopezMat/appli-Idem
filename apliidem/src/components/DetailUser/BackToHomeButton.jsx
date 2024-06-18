import React from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';



const BackToHomeButton = () => {
  return (
    <Link to="/">
    <IconButton aria-label="home" size="large">
     <HomeIcon fontSize="inherit" />
    </IconButton>
    </Link>
  );
};

export default BackToHomeButton;