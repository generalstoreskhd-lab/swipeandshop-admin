import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  adminName: string | null;
  adminEmail: string | null;
  role: 'admin' | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  adminName: null,
  adminEmail: null,
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ name: string; email: string; role: 'admin' }>) => {
      state.isLoggedIn = true;
      state.adminName = action.payload.name;
      state.adminEmail = action.payload.email;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.adminName = null;
      state.adminEmail = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
