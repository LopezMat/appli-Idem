import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { apiRoot } from '../../constants/ApiConstant';
import { useAuthContext } from '../../contexts/AuthContext';
import ButtonLoader from '../../components/Loader/ButtonLoader';
import CustomInput from '../../components/CustomInput';

const Register = () => {

  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(''); // Ajouter un état pour les messages d'erreur
  const { signIn } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(''); // Réinitialiser l'erreur avant de faire la requête

    try {
      const response = await axios.post(`${apiRoot}/register`, {
        pseudo,
        email,
        password
      });

      if (response.data.email) {
        const user = {
          userId: response.data.id,
          pseudo: response.data.pseudo,
          email: response.data.email
        };

        signIn(user);
        setIsLoading(false);
        navigate('/');
      } else {
        setIsLoading(false);
        setError('Erreur lors de la réponse du serveur');
        console.log(`Erreur lors de la réponse serveur: ${response}`);
      }
    } catch (error) {
      setIsLoading(false);
      setError('Erreur lors de l\'enregistrement de l\'utilisateur');
      console.log(`Erreur lors de l'enregistrement de l'utilisateur: ${error}`);
    }
  };

  return (
    <div className='flex flex-1 flex-col h-screen justify-start items-center bg-kigo'>
      <img src={`${apiRoot}/images/kigoLogo.jpg`} alt='logo' className='w-2/3 mt-20' />
      <h2 className='text-white font-bold text-xl py-5 mt-5'>Enregistrez-vous!</h2>
      <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
        <CustomInput
          state={pseudo}
          label="Mon pseudo"
          type="text"
          callable={(event) => setPseudo(event.target.value)}
        />
        <CustomInput
          state={email}
          label="Mon email"
          type="email"
          callable={(event) => setEmail(event.target.value)}
        />
        <CustomInput
          state={password}
          label="Mon mot de passe"
          type="password"
          callable={(event) => setPassword(event.target.value)}
        />
        {error && <p className='text-red-500'>{error}</p>} {/* Afficher le message d'erreur */}
        <p className='text-white'>Vous avez déjà un compte?
          <Link to='/' className='text-white font-bold hover:text-green'> Se connecter</Link>
        </p>
        <div className='flex items-center justify-center pt-5'>
          {isLoading ? <ButtonLoader /> :
            <button type='submit' className='bg-green hover:bg-green_top text-white font-bold py-2 px-4 rounded'>
              S'enregistrer
            </button>}
        </div>
      </form>
    </div>
  );
}

export default Register;
