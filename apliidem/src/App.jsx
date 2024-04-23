import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuthContext } from './contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { USER_INFOS } from './constants/appConstant'
import { checkUser } from './service/userService'
import { useSelector } from 'react-redux'
import LabelBottomNavigation from './components/NavBar'



const App = () => {

  //on récupère les données de l'utilisateur depuis le locale storage
  const userInfo = JSON.parse(localStorage.getItem(USER_INFOS));

  const fetchUser = async () => {
    const user = await checkUser(userInfo);
    if (user) {
      return;
    } else {
      console.log('toto')
      // signOut();
      // navigate('/')
    }
  }

  const { signOut } = useAuthContext();
  //on récupère le hook de navigation
  const navigate = useNavigate();



  useEffect(() => {
    fetchUser();
  }, [userInfo])



  return (
    <>
      <Outlet />
      <LabelBottomNavigation className='fixed bottom-0' />
    </>

  );
}

export default App
