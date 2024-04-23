import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { fetchUser } from '../../../redux/user/userSlice';
import { selectUserData } from '../../../redux/user/userSelector';
import { BsFillPencilFill } from "react-icons/bs";
import PageLoader from '../../../components/Loader/PageLoader';


const Account = () => {

  const dispatch = useDispatch();
  const params = useParams();

  const userId = params.id;

  useEffect(() => {
    dispatch(fetchUser(userId))
  }, [])



  const { loading, user } = useSelector(selectUserData)


  if (loading) return <PageLoader />

  return (
    console.log(user),
    <div className='flex flex-col items-center justify-center mt-20'>
      <h1 className="text-4xl font-bold mb-5"> Mon compte</h1>
      <div className='flex flex-col items-center justify-center'>
        <div className="relative w-40 h-40 flex flex-col">
          <Link to={`/edit`} className="absolute bottom-0 right-0 border rounded-full p-2 cursor-pointer hover:bg-green_top ">
            <BsFillPencilFill size={20} />
          </Link>
        </div>
      </div>
      <div className='relative w-80 h-auto border rounded-lg flex flex-col items-center my-5 pb-10'>
        <p className='text-xl font-bold text-center mt-5'>Pseudo : {user?.pseudo ?? 'Pas de pseudo'}</p>

        <p className='text-xl font-bold text-center mt-5'>Email: {user?.email ?? 'Pas d\'email'}</p>
        <p className='text-xl font-bold text-center mt-5'>Mot de passe : *********</p>
        <Link to="/profil/edit" className="absolute  bottom-3 right-2 border rounded-full p-2 cursor-pointer  hover:bg-green_top">
          <BsFillPencilFill size={20} />
        </Link>
      </div>
    </div>


  )
}

export default Account