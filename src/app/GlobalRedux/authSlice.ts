import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : null, // Извлекаем токен из localStorage при загрузке
    isAuthenticated: localStorage.getItem('token') !== null, // Проверяем, есть ли токен в localStorage
  },
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      // Сохраняем токен в localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', action.payload.token);
      }
    },
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      // Удаляем токен из localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
    },
  },
});
 
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
 