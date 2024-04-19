import { createSelector } from "@reduxjs/toolkit";


const selectLoading = state => state.user.loading;
const selectUserFavorite = state => state.user.userFavorite;
const selectUser = state => state.user.user;
const selectAvatars = state => state.user.avatars;

//on crée le selector pour recuperer les informations d'un utilisateur
export const selectUserData = createSelector(
  [selectLoading, selectUserFavorite, selectUser, selectAvatars],
  (loading, userFavorite, user, avatars) => ({
    loading,
    userFavorite,
    user,
    avatars
  })
)