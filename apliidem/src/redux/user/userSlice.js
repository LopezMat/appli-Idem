import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../constants/ApiConstant";
import axios from "axios";


const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    userFavorite: [],
    user: {},
    avatars: [],
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setUserFavorite: (state, action) => {
      state.userFavorite = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
    setAvatars: (state, action) => {
      state.avatars = action.payload
    }
  }
})

//on crée la méthode pour recuperer les informations d'un utilisateur
export const fetchUser = (id) => async dispatch => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get(`${api}/users/${id}`)
    dispatch(setUser(response.data));
    dispatch(setLoading(false));
  } catch (error) {
    console.log(`Erreur lors du fetchUser : ${error}`)
    setLoading(false);
  }
  //ensuite on range la méthode dans le store redux
}

export default userSlice.reducer