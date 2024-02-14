export const SETTINGS_STATE_NAME = 'ZEMBRODT_PORTFOLIO_SETTINGS';

export enum Theme {
  Light = 'light-theme',
  Dark = 'dark-theme'
}

export interface SettingsModel {
  theme: Theme;
}

export const DEFAULT_SETTINGS: SettingsModel = {
  theme: Theme.Dark
};
