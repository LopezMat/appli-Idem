import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";



const store = configureStore({
  reducer: {
    //TODO: futur reducers
    user: userReducer,
  },
})

export default store;