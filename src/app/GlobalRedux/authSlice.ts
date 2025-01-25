import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Типы для состояния
interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  userFetched: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
}

// Типизация RootState (предположительно у вас есть этот тип)
import { RootState } from '../../store';

// Асинхронное обновление токена
export const refreshAccessToken = createAsyncThunk<
  { access_token: string }, // Успешный результат
  void, // Аргумент
  { state: RootState; rejectValue: string }
>(
  'auth/refreshAccessToken',
  async (_, { getState, rejectWithValue, dispatch }) => {
    const { refreshToken } = getState().auth;

    if (!refreshToken) return rejectWithValue('Нет токена обновления');

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}refresh`;
      const response = await axios.post(apiUrl, { refreshToken });
      const { access_token: accessToken } = response.data;

      dispatch(
        login({
          accessToken,
          refreshToken,
          user: null,
        })
      );

      localStorage.setItem('accessToken', accessToken);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Ошибка обновления токена');
    }
  }
);

// Асинхронное получение пользователя
export const getUser = createAsyncThunk<
  User, // Успешный результат
  void, // Аргумент
  { state: RootState; rejectValue: string }
>(
  'auth/getUser',
  async (_, { getState, dispatch, rejectWithValue }) => {
    const { accessToken } = getState().auth;

    if (!accessToken) return rejectWithValue('Нет токена доступа');

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}user`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const { id, name, email } = response.data;

      return { id, name, email };
    } catch (error: any) {
      if (error.response?.status === 403) {
        const refreshResult = await dispatch(refreshAccessToken());

        if (refreshResult.meta.requestStatus === 'rejected') {
          dispatch(logout());
          localStorage.clear();
          return rejectWithValue('Ошибка авторизации');
        }

        return dispatch(getUser()).unwrap();
      }

      return rejectWithValue(error.response?.data || 'Ошибка получения пользователя');
    }
  }
);

// Состояние
const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  user: null,
  isLoading: true,
  userFetched: false,
};

// Слайс
const authSlice = createSlice({
  name: 'auth',
  initialState,
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
      state.userFetched = false;
    },
    login: (state, action: PayloadAction<{ accessToken: string; refreshToken?: string; user: User | null }>) => {
      const { accessToken, refreshToken, user } = action.payload;
      state.accessToken = accessToken;
      if (refreshToken) state.refreshToken = refreshToken;
      state.isAuthenticated = true;
      state.user = user;
      state.isLoading = false;
      state.userFetched = true;

      localStorage.setItem('accessToken', accessToken);
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.user = null;
      state.isLoading = false;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isLoading = false;
        state.userFetched = true;
      })
      .addCase(getUser.rejected, (state) => {
        state.user = null;
        state.isLoading = false;
        state.userFetched = false;
      });
  },
});

export const { login, logout, loadTokens } = authSlice.actions;
 
export default authSlice.reducer;
 