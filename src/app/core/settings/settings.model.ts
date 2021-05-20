export const DARK_THEME = 'dark-theme';
export const LIGHT_THEME = 'light-theme';

export interface SettingsModel {
  theme: string;
}

export const DEFAULT_SETTINGS: SettingsModel = {
  theme: DARK_THEME
};
