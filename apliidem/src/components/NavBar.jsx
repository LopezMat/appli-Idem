import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import Diversity1 from '@mui/icons-material/Diversity1';
import { Person4, Person4Rounded, Telegram } from '@mui/icons-material';


export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation sx={{ width: 450, position: 'fixed', marginTop: '800px', backgroundColor: 'rgba(249, 79, 13, 1)' }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="Acceuil"
        value="acceuil"
        sx={{ color: 'white' }}
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        label="Projets"
        value="favorites"
        sx={{ color: 'white' }}
        icon={<Diversity1 />}
      />
      <BottomNavigationAction
        label="Chats"
        value="chats"
        sx={{ color: 'white' }}
        icon={<Telegram />}
      />
      <BottomNavigationAction
        label="Profile"
        value="profile"
        sx={{ color: 'white', }}
        icon={<Person4Rounded />}
      />
    </BottomNavigation>
  );
}
