import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Типизация для состояния
interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

export const loadAuthData = createAsyncThunk('auth/loadAuthData', async () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    return token ? { token, isAuthenticated: true } : { token: null, isAuthenticated: false };
  }
  return { token: null, isAuthenticated: false };
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isAuthenticated: false,
  } as AuthState, // Явно указываем тип состояния
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', action.payload.token);
      }
    },
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadAuthData.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = action.payload.isAuthenticated;
    });
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
 