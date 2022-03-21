import { ThemeType } from '../data/base';

export const ThemeStatus = (state = ThemeType.DarkMode, action: any) => {
  switch (action.type) {
    case 'THEME_UPDATE' :
      state = action.payload.themeValue;
      return state;
    default :
      return state;
  }
};
