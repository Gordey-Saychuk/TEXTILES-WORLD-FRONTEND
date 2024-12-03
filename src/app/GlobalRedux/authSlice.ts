import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const refreshAccessToken = createAsyncThunk(
  'auth/refreshAccessToken',
  async (_, { getState, rejectWithValue }) => {
    const { refreshToken } = (getState() as RootState).auth;
    if (!refreshToken) return rejectWithValue('Нет токена обновления');

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}refresh`, {
        refreshToken,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка обновления токена');
    }
  }
);

export const getUser = createAsyncThunk(
  'auth/getUser',
  async (_, { getState, rejectWithValue }) => {
    const { accessToken } = (getState() as RootState).auth;
    if (!accessToken) return rejectWithValue('Нет токена доступа');

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}user`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        await refreshAccessToken();
        return getUser();
      }
      return rejectWithValue('Ошибка при запросе данных пользователя');
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
    login: (state, action) => {
      const { accessToken, refreshToken, user } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
      state.user = user;
      state.isLoading = false;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(refreshAccessToken.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      localStorage.setItem('accessToken', action.payload.accessToken);
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    }); 
    builder.addCase(getUser.rejected, (state) => {
      state.user = null;
      state.isLoading = false;
    });
  },
});

export const { login, logout, loadTokens } = authSlice.actions;
export default authSlice.reducer;
 