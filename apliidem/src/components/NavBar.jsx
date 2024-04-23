import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import Diversity1 from '@mui/icons-material/Diversity1';
import { Person4Rounded, Telegram } from '@mui/icons-material';
import { Link, json } from 'react-router-dom';
import { useSelector } from 'react-redux';




export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('recents');

  const id = JSON.parse(localStorage.getItem('userInfos')).userId


  const handleChange = (event, newValue) => {
    setValue(newValue);

  };

  return (
    console.log(id),
    <BottomNavigation sx={{ width: 450, position: 'fixed', marginTop: '1740px', backgroundColor: 'rgba(249, 79, 13, 1)' }} value={value} onChange={handleChange}>
      <Link to='/' underline="none" color="white" >
        <BottomNavigationAction
          label="Acceuil"
          value="acceuil"
          sx={{ color: 'white' }}
          icon={<HomeIcon />}
        />
      </Link>
      <Link to={`/projet/${id}`} underline="none" color="white">
        <BottomNavigationAction
          label="Projets"
          value="favorites"
          sx={{ color: 'white' }}
          icon={<Diversity1 />}
        />
      </Link>

      <BottomNavigationAction
        label="Chats"
        value="chats"
        sx={{ color: 'white' }}
        icon={<Telegram />}
      />
      <Link to={`/profil/${id}`} underline="none" color="white">
        <BottomNavigationAction
          label="Profile"
          value="profile"
          sx={{ color: 'white', }}
          icon={<Person4Rounded />}
        />
      </Link>
    </BottomNavigation>
  );
}
