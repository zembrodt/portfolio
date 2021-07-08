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
