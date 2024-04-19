import axios from 'axios';
import { api } from '../constants/ApiConstant';

export const checkUser = async (userInfo) => {
  try {
    //on récupère l'utilisateur dans la bdd avec l'id en session
    const response = await axios.get(`${api}/users/${userInfo.userId}`);
    const user = response.data;
    console.log('user ', user)
    console.log('userInfo ', userInfo)

    //maintenant on compare les données de la bdd avec celles en session
    if (user.email === userInfo.email && user.pseudo === userInfo.pseudo) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(`Erreur sur le checkUser: ${error}`)
    return false;
  }
}