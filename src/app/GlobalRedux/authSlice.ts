import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const refreshAccessToken = createAsyncThunk(
  'auth/refreshAccessToken',
  async (_, { getState, rejectWithValue, dispatch }) => {
    const { refreshToken } = (getState() as RootState).auth;

    console.log('Refresh token:', refreshToken); // Логируем refreshToken для проверки

    if (!refreshToken) return rejectWithValue('Нет токена обновления');

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}refresh`;
      console.log('API URL:', apiUrl); // Логируем URL для проверки
      console.log('Refresh tokens:', refreshToken); 
      const response = await axios.post(
        apiUrl,
        { refreshToken }
      );

      // Извлекаем только accessToken из ответа
      const { access_token: accessToken } = response.data;
 
      console.log('New access token:', accessToken);  

      // Обновляем только accessToken в Redux и сохраняем его в localStorage
      dispatch(login({
        accessToken,
        refreshToken, // Оставляем старый refreshToken
        user: null
      }));

      localStorage.setItem('accessToken', accessToken);
      // Не обновляем refreshToken в localStorage

      return response.data;
    } catch (error) {
      console.error('Ошибка обновления токена:', error); // Логируем ошибку
      return rejectWithValue(error.response?.data || 'Ошибка обновления токена');
    }
  }
);
 
 
 
 
 

export const getUser = createAsyncThunk(
  'auth/getUser',
  async (_, { getState, dispatch, rejectWithValue }) => {
    const { accessToken } = (getState() as RootState).auth;

    if (!accessToken) return rejectWithValue('Нет токена доступа');

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}user`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      const { id, name, email } = response.data; // Измените это в зависимости от структуры вашего ответа
      return { id, name, email }; 
    } catch (error) {
      if (error.response?.status === 403) {
        // Если access токен истёк, пытаемся обновить его
        const refreshResult = await dispatch(refreshAccessToken());
        if (refreshResult.meta.requestStatus === 'rejected') {
          dispatch(logout());
          localStorage.clear(); // Очистить все локальные данные
          return rejectWithValue('Ошибка авторизации');
        }
        // Повторный запрос данных пользователя
        return dispatch(getUser());
      }
      return rejectWithValue(error.response?.data || 'Ошибка получения пользователя');
    }
  }
);
 
 
 
 

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    user: null,
    isLoading: true,
    userFetched: false,
  },
  reducers: {
    loadTokens: (state) => {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
    
      if (accessToken && refreshToken) {
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        state.isAuthenticated = true;
      }
      state.isLoading = false;
      state.userFetched = false; // При загрузке токенов сбрасываем флаг
    },
    login: (state, action) => {
      const { accessToken, refreshToken, user } = action.payload;
      state.accessToken = accessToken; // Обновляем только accessToken
      // Не обновляем refreshToken, если он не был передан
      if (refreshToken) {
        state.refreshToken = refreshToken; 
      }
      state.isAuthenticated = true;
      state.user = user;
      state.isLoading = false;
      state.userFetched = true; // Устанавливаем флаг, что пользователь загружен
    
      localStorage.setItem('accessToken', accessToken);
      // Не обновляем refreshToken в localStorage
    }, 
    logout: (state) => {
      console.log('Logging out, clearing tokens');
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.user = null;
      state.isLoading = false;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      console.log('User fetched successfully:', action.payload);
      state.user = action.payload;
      state.isLoading = false;
      state.userFetched = true;
    });
    builder.addCase(getUser.rejected, (state) => {
      console.log('Failed to fetch user, resetting user state');
      state.user = null;
      state.isLoading = false;
      state.userFetched = false; 
    });
  }
});
 
 
 

export const { login, logout, loadTokens } = authSlice.actions;
export default authSlice.reducer; 