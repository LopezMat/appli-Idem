import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext';
import { api } from '../../../constants/ApiConstant';
import CustomInput from '../../../components/CustomInput';
import ButtonLoader from '../../../components/Loader/ButtonLoader';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../redux/user/userSlice';
import axios from 'axios';

const EditProfil = () => {


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

  const [listFiliere, setListFiliere] = useState([]);
  const [listCompetences, setListCompetences] = useState([]);

  const [userId, setUserId] = useState('');
  const [filliere, setFilliere] = useState('');
  const [competences, setCompetences] = useState('');
  const [biographie, setBiographie] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  //Fonction pour gérer le changement de competences
  const handleChangeCompetences = (event) => {
    const selectedCompetences = event.target.value;
    //on met à jour le state
    setCompetences(selectedCompetences);
  }


  const handleSubmit = (event) => {
    setIsLoading(true);
    axios
      .post(`http://api-symfony-7-spotify.lndo.site/register`, {
        nickname,
        email,
        password,
        filiere: `/api/filieres/${filliere}`,

        skills,
      })
      .then((response) => {
        if (response.data.email) {
          const user = {
            userId: response.data.id,
            nickname: response.data.pseudo,
            email: response.data.email,
            filiere: response.data.filiere,
            competences: response.data.competences,
          };

          try {
            signIn(user);
            setIsLoading(false);
            navigate("/");
          } catch (error) {
            setIsLoading(false);
            console.log(`Erreur lors de la création de la session: ${error}`);
          }
        } else {
          setIsLoading(false);
          console.log(`Erreur lors de la réponse serveur: ${response}`);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(`Erreur lors de l'enregistrement de l'user: `, error);
      });
  };



  return (
    <div className='flex flex-1 flex-col h-screen justify-start items-center bg-kigo'>
      <img src={`${api}/images/kigoLogo.jpg`} alt='logo' className='w-2/3 mt-20' />
      <h2 className='text-white font-bold text-xl py-5 mt-5'>Enregistrez vous!</h2>
      <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
        {/* input pour pseudo */}
        <select value={filliere} onChange={(handleChangeFilliere)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
          <option selected>Choisissez votre filière</option>
          {listFiliere && listFiliere.map((filiere) => (
            <option key={filiere.id} value={filiere.id}>{filiere.label}</option>
          ))}
        </select>
        {/* input pour email */}

        <div className='flex flex-col items-center justify-center'>
          {listCompetences && listCompetences.map((competence) => (
            <div key={competence.id} className="relative w-15 h-15 flex flex-col">
              <input type='checkbox' id={competence.id} value={competence.id} onChange={handleChangeCompetences} className='w-5 h-5' />
              <label htmlFor={competence.id} className='text-white font-bold'>{competence.label}</label>
            </div>
          ))}
        </div>
        {/* input pour password */}
        < CustomInput
          state={biographie}
          label="Ma biographie"
          type="text"
          callable={(event) => setBiographie(event.target.value)}
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