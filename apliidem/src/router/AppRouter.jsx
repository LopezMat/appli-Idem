import React, { useEffect } from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react'
import { useAuthContext } from '../contexts/AuthContext';
import { RouterProvider } from 'react-router-dom';
import OnlineRouter from './OnlineRouter';
import OfflineRouter from './OfflineRouter';
import { USER_INFOS } from '../constants/appConstant';

//création d'un mini context pour la session
const SessionContext = createContext({
  inSession: false
});
//création du hook pour utiliser le context de session
export const useSessionContext = () => useContext(SessionContext);

const AppRouter = () => {
  //on déclare notre state session
  const [inSession, setInSession] = useState(null);
  //on récupère les infos de notre authContext
  const { userId, setUserId, setEmail, setPseudo } = useAuthContext();
  //on va regarder si on a des infos dans le locale storage
  const getUserInfos = async () => {
    const user = JSON.parse(localStorage.getItem(USER_INFOS));
    if (user) {
      setUserId(user.userId);
      setEmail(user.email);
      setPseudo(user.pseudo);
      setInSession(true);
    } else {
      setInSession(false);
    }
  };

  //on va appeller getUserInfos dès que l'on monte le composant
  useEffect(() => {
    getUserInfos();
  }, [userId]);

  const value = {
    inSession
  }

  return (
    //on récupère le context de session
    <SessionContext.Provider value={value}>
      {/* ici on appelle le bon router suivant le context de session */}
      <RouterProvider router={inSession ? OnlineRouter : OfflineRouter} />
    </SessionContext.Provider>
  )
}

export default AppRouter