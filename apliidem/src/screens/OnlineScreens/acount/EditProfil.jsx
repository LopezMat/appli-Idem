import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext';
import { api, apiRoot } from '../../../constants/ApiConstant';
import CustomInput from '../../../components/CustomInput';
import ButtonLoader from '../../../components/Loader/ButtonLoader';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../redux/user/userSlice';
import axios from 'axios';

const EditProfil = () => {


  const changeArray = (array) => {
    const newArray = [];
    array.forEach((element) => {
      newArray.push(`/api/competencess/${element}`);
    })
    return newArray
  }

  useEffect(() => {
    fetchFillieres();
    fetchCompetences();
  }, [])

  const dispatch = useDispatch();

  const handleCheckBoxChangeComp = (event) => {
    const targetValue = event.target.value;
    if (event.target.checked && !competences.includes(targetValue)) {
      setCompetences((prevComp) => [...prevComp, targetValue]);
    } else {
      setCompetences((prevComp) => prevComp.filter((c) => c != targetValue));
    }
  }

  const fetchFillieres = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${api}/filieres`);
      setListFiliere(response.data['hydra:member']);
      setLoading(false);

    } catch (error) {
      console.log(`Erreur lors du fetchFillieres : ${error}`)
      setLoading(false);
    }
  }

  const fetchCompetences = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${api}/competencess`);
      setListCompetences(response.data['hydra:member']);
      setLoading(false);

    } catch (error) {
      console.log(`Erreur lors du fetchCompetences : ${error}`)
      setLoading(false);
    }
  }

  const userId = JSON.parse(localStorage.getItem('userInfos'));


  const [user, setUser] = useState({});
  const [filliere, setFilliere] = useState('');
  const [selectFiliere, setSelectFiliere] = useState([{
    "id" : 1,
    "name": "Marketing",
  },
  {
    "id" : 2,
    "name": "Service",
  },
  {
    "id" : 3,
    "name": "Technique",
  }
])
  const [listFiliere, setListFiliere] = useState([]);
  const [competences, setCompetences] = useState('');
  const [biographie, setBiographie] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [profilId, setProfilId] = useState();
  const [profil, setProfil] = useState({});
  const [biographieVal, setBiographieVal] = useState('');
  const [listCompetences, setListCompetences] = useState([]);


  //on récupère toutes les donnees de notre profil et les stocker dans le state
  const fetchProfil = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${api}/profils?page=1&user=${userId.userId}`)
      console.log(response.data);
      setUser(response.data['hydra:member'][0]);
      setFilliere(response.data['hydra:member'][0].filiere.id);
      setBiographie(response.data['hydra:member'][0].bio);
      setProfilId(response.data['hydra:member'][0].id);
      setLoading(false);
    } catch (error) {
      console.log(`Erreur lors du fetchProfil : ${error}`)
      setLoading(false);
    }

  }


  //on déclare notre context d'authentification
  const { signIn } = useAuthContext();
  //on récupèrer le hook de navigation
  const navigate = useNavigate();

  //Fonction pour gérer le changement de filliere
  const handleChangeFilliere = (event) => {
    const selectedFilliere = event.target.value;
    //on met à jour le state
    setFilliere(selectedFilliere);
  }


  const handleSubmit = async (event) => {
    console.log('yo')
    try {
      event.preventDefault();
      //accepter le format JSON + le patch
      axios.defaults.headers.patch['Content-Type'] = 'application/merge-patch+json';
      const filliereApi = `/api/filieres/${filliere}`;

      //on patch le profil
      const yoyo = await axios.patch(`${api}/profils/${user.id}`, {
        bio: biographie,
        competences: changeArray(competences),
        filiere: filliereApi
      })

      console.log(yoyo)

      navigate('/');
    } catch (error) {
      console.log(`Erreur lors de l'envoi de la requête serveur : ${error}`);
      navigate('/');
    }
  };

  useEffect(() => {
    fetchProfil();
  }, [])


  return (
    console.log('aaaaaaaaaaaaaaa', competences),
    <div className='flex flex-1 flex-col h-screen justify-start items-center bg-kigo'>
      <img src={`${apiRoot}/images/kigoLogo.jpg`} alt='logo' className='w-2/3 mt-20' />
      <h2 className='text-white font-bold text-xl py-5 mt-5'>Enregistrez vous!</h2>
      <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
        {/* input pour pseudo */}
        <select defaultValue={filliere} onChange={(e) => setFilliere(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
          {filliere == '' ? <option selected>Choisissez votre filière</option> : null}
          {listFiliere && listFiliere.map((filiere) => (
            <option key={filiere.id} value={filiere.id}>{filiere.label}</option>
          ))}
        </select>
        <br />
        {/* input pour email */}

        <div className='flex flex-col items-center justify-center'>
          {listCompetences && listCompetences.map((competence) => (
            <div key={competence.id} className="relative w-15 h-15 flex flex-col items-center">
              <input type='checkbox' id={competence.id} value={competence.id} onChange={handleCheckBoxChangeComp} className='w-5 h-5' />
              <label htmlFor={competence.id} className='text-white font-bold'>{competence.label}</label>
              <br />
            </div>
          ))}
        </div>
        {/* input pour Biographie */}
        < CustomInput
          state={biographie}
          label="Ma biographie"
          type="text"
          callable={(event) => setBiographieVal(event.target.value)}
        />

        <div className='flex items-center justify-center pt-5'>
          {isLoading ? <ButtonLoader /> :
            <button type='submit' className='bg-green hover:bg-green_top text-white font-bold py-2 px-4 rounded'>
              S'enregistrer son profil
            </button>}

        </div>
      </form>
    </div>
  )

}
export default EditProfil
