import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  isLoggedIn: false,
  urls: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.name = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.name = '';
      state.isLoggedIn = false;
      state.urls = [];
    },
    setUrls: (state, action) => {
      state.urls = action.payload;
    },
    addUrl: (state, action) => {
      state.urls.push(action.payload);
    },
    deleteUrl: (state, action) => {
      state.urls = state.urls.filter(url => url.id !== action.payload);
    },
    clearUrls: (state) => {
      state.urls = [];
    },
  },
});

export const { login, logout, setUrls, addUrl, updateUrl, deleteUrl, clearUrls } = userSlice.actions;
export default userSlice.reducer;