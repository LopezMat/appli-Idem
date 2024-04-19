import { createContext, useContext, useState } from "react";
import { USER_INFOS } from "../constants/appConstant";

//création du context d'authentification
const AuthContext = createContext({
  userId: '', //state
  email: '', //state
  pseudo: '', //state
  setUserId: () => { }, //méthode pour modifier le state userId
  setEmail: () => { }, //méthode pour modifier le state email
  setPseudo: () => { }, //méthode pour modifier le state nickname
  signIn: async () => { }, //méthode pour se connecter
  signOut: async () => { }, //méthode pour se déconnecter
});

//on définit toute la mécanique de notre context
const AuthContextProvider = ({ children }) => {
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [pseudo, setPseudo] = useState('');

  const signIn = async (user) => {
    try {
      setUserId(user.userId)
      setEmail(user.email)
      setPseudo(user.pseudo)
      localStorage.setItem(USER_INFOS, JSON.stringify(user))
    } catch (error) {
      throw new Error(`Erreur lors de la connexion : ${error}`)
    }
  }

  const signOut = async () => {
    try {
      setUserId('')
      setEmail('')
      setPseudo('')
      localStorage.removeItem(USER_INFOS)
    } catch (error) {
      throw new Error(`Erreur lors de la déconnexion : ${error}`)
    }
  }

  const value = {
    userId,
    email,
    pseudo,
    setUserId,
    setEmail,
    setPseudo,
    signIn,
    signOut
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

//création de notre propre hook pour utiliser le context d'authentification
const useAuthContext = () => useContext(AuthContext)

export { AuthContext, AuthContextProvider, useAuthContext }