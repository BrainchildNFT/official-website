import { ThemeType } from '../data/base';

export const themeUpdate = (themeValue: ThemeType) => {
  return {
    type: "THEME_UPDATE",
    payload: {
      themeValue
    }
  };
};