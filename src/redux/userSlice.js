import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  is_logged_in: false,
  id_user:'',
  username: '',
  firtsName:'',
  middleName:'',
  last_name:'',
  second_last_name:'',
  type_user: 0,
  photo:'',
  url: process.env.URL_HOST,

};



const authSlice = createSlice({
  name: 'data_aldia',
  initialState,
  reducers: {
    login: (state, action) => {
      const { username,id_user, is_logged_in, firtsName, middleName, last_name, second_last_name, type_user, photo } = action.payload;
      state.is_logged_in = is_logged_in;
      state.id_user = id_user;
      state.username = username;
      state.firtsName = firtsName;
      state.middleName = middleName;
      state.last_name = last_name;
      state.second_last_name = second_last_name;
      state.type_user = type_user;
      state.photo = photo
    },
    logout: (state) => {
      state.is_logged_in = false;
      state.username = '';
      state.firtsName = '';
      state.middleName = '';
      state.last_name = '';
      state.second_last_name = '';
      state.type_user = 0;
      state.photo = '';
      state.id_user = '';
    },

    changeName:(state, action) => {
      const {name} = action.payload;
      state.name = name;
    },
  },
});



export const { login, logout, changeName } = authSlice.actions;




export const selectAuth = state => state.data_aldia;
export const selectIsLoggedIn = state => state.data_aldia.is_logged_in;
export const selectName = state => state.data_aldia.username;
export const selectURL = state => state.data_aldia.url;



export default authSlice.reducer;

