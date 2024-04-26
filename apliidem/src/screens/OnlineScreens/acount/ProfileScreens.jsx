import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { fetchUser, setLoading } from '../../../redux/user/userSlice';
import { selectUserData } from '../../../redux/user/userSelector';
import { BsFillPencilFill } from "react-icons/bs";
import PageLoader from '../../../components/Loader/PageLoader';
import axios from 'axios';
import { api } from '../../../constants/ApiConstant';
import Button from '@mui/material/Button';

const Account = () => {

  const dispatch = useDispatch();
  const params = useParams();
  const [profil, setProfil] = useState({});
  const [filliere, setFilliere] = useState();

  const userId = params.id;

  //on récupère toutes les donnees de notre profil et les stocker dans le state
  const fetchProfil = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${api}/profils?page=1&user=${userId.userId}`)
      setProfil(response.data['hydra:member'][0]);
      setFilliere(response.data['hydra:member'][0].filiere.id);
      // setBiographie(response.data['hydra:member'][0].bio);
      setLoading(false);
    } catch (error) {
      console.log(`Erreur lors du fetchProfil : ${error}`)
      setLoading(false);
    }

  }

  useEffect(() => {
    dispatch(fetchUser(userId))
    fetchProfil(userId)
  }, [])



  const { loading, user } = useSelector(selectUserData)


  if (loading) return <PageLoader />

  return (
    console.log(profil),
    < div className='flex flex-col items-center justify-center mt-20' >
      <h1 className="text-4xl font-bold mb-5"> Mon compte</h1>
      <div className='flex flex-col items-center justify-center'>
        <br />
        <div className="relative w-100 h-50 flex flex-col border rounded-lg">
          <button className='bg-orange-500 shadow-lg shadow-orange-500/50 text-white font-bold py-2 px-4 rounded'>
            <Link to={`/edit`} variant="solid">
              Modifier mon compte /mail/ psuedo/ mot de passe
            </Link>
          </button>


        </div>
      </div>
      <div className='relative w-80 h-auto border-double border-4 border-orange-500 flex flex-col items-center my-5 pb-10'>
        <p className='text-xl font-bold text-center mt-5'>Pseudo : {user?.pseudo ?? 'Pas de pseudo'}</p>
        <p className='text-xl font-bold text-center mt-5'>Email: {user?.email ?? 'Pas d\'email'}</p>
        <p className='text-xl font-bold text-center mt-5'>Mot de passe : *********</p>
        <p className='text-xl font-bold text-center mt-5'>Bio : {profil?.bio ?? 'Pas de biographie'}</p>
        <p className='text-xl font-bold text-center mt-5'>Modifier mon profil</p>
        <p className='text-xl font-bold text-center mt-5'>Filière : {profil?.filiere?.label ?? 'Pas de filiere'}</p>
        <Link to="/profil/edit" className='bg-orange-500 shadow-lg shadow-orange-500/50 text-white font-bold py-2 px-4 rounded mt-5'>
          <Button variant="contained outlined">Modification du profil</Button>
        </Link>

      </div>
    </div >


  )
}

export default Account