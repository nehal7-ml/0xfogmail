import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserAccount {
  id: string;
  account: string;
  primaryEmail: string;
  createdAt: string;
  isConnected: boolean;
}

interface AccountState {
  account: UserAccount | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AccountState = {
  account: null,
  isLoading: false,
  error: null,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccount: (state, action: PayloadAction<UserAccount>) => {
      state.account = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    clearAccount: (state) => {
      state.account = null;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setAccount, clearAccount, setLoading, setError } = accountSlice.actions;
export default accountSlice.reducer;