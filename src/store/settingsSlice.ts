import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Theme = 'dark' | 'light';
export type FontSize = 'small' | 'medium' | 'large';

interface SettingsState {
  theme: Theme;
  fontSize: FontSize;
  desktopAlerts: boolean;
}

const initialState: SettingsState = {
  theme: 'light',
  fontSize: 'medium',
  desktopAlerts: true,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSettings: (state, action: PayloadAction<Partial<SettingsState>>) => {
      return { ...state, ...action.payload };
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
    setFontSize: (state, action: PayloadAction<FontSize>) => {
      state.fontSize = action.payload;
    },
    setDesktopAlerts: (state, action: PayloadAction<boolean>) => {
      state.desktopAlerts = action.payload;
    },
  },
});

export const { updateSettings, setTheme, setFontSize, setDesktopAlerts } = settingsSlice.actions;
export default settingsSlice.reducer;