import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  idUser:'',
  username: '',
  firtsName:'',
  middleName:'',
  lastName:'',
  surnamen:'',
  rol: "",
  photo:'',
};



const authSlice = createSlice({
  name: 'data_aldia',
  initialState,
  reducers: {
    login: (state, action) => {
      const { username,idUser,  firtsName, middleName, lastName, surnamen, rol, photo } = action.payload;
      state.idUser = idUser;
      state.username = username;
      state.firtsName = firtsName;
      state.middleName = middleName;
      state.lastName = lastName;
      state.surnamen = surnamen;
      state.rol = rol;
      state.photo = photo
    },
    deleteStoreData: (state) => {
      state.username = '';
      state.firtsName = '';
      state.middleName = '';
      state.lastName = '';
      state.surnamen = '';
      state.rol = "";
      state.photo = '';
      state.idUser = '';
    },

    changeName:(state, action) => {
      const {name} = action.payload;
      state.name = name;
    },
    changePhoto:(state, action) => {
      const {foto_perfil} = action.payload;
      state.photo = foto_perfil;
    },
  },
});



export const { login, deleteStoreData, changeName, changePhoto } = authSlice.actions;




export const selectAuth = state => state.data_aldia;
export const selectIsLoggedIn = state => state.data_aldia.is_logged_in;
export const selectName = state => state.data_aldia.username;
export const selectURL = state => state.data_aldia.url;



export default authSlice.reducer;

