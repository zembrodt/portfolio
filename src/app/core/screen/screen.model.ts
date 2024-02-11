export const SCREEN_STATE_NAME = 'ZEMBRODT_PORTFOLIO_SCREEN';

// Screen sizes in pixels
export const SCREEN_SIZE_XS = 600;
export const SCREEN_SIZE_SM = 960;
export const SCREEN_SIZE_MD = 1280;
export const SCREEN_SIZE_LG = 1920;

// Screen size aliases
export const ALIAS_XS = 'xs';
export const ALIAS_SM = 'sm';
export const ALIAS_MD = 'md';
export const ALIAS_LG = 'lg';
export const ALIAS_XL = 'xl';

export interface ScreenModel {
  isXs: boolean;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
}

export const DEFAULT_SCREEN: ScreenModel = {
  isXs: false,
  isSm: false,
  isMd: false,
  isLg: false,
  isXl: false
};
