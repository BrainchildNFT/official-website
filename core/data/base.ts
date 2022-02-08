export const breakpointMap: { [key: string]: number } = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
  xxxl: 3000,
};

export enum ThemeType {
  LightMode,
  DarkMode,
}

export interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

export const projectSchedule = {
  wYear: 2022,
  wMonth: 2,
  wDay: 8,
  wHour: 0,
  wMin: 0,
  wSec: 0,
  endYear: 2022,
  endMonth: 2,
  endDay: 10,
  endHour: 0,
  endMin: 0,
  endSec: 0,
  landing: {
    waiting: 'Presale raffle begins on 07 Feb, 2022 at 00:00 AM UTC',
    live: '08 Feb, 2022 at 00:00 AM UTC',
  },
  wallet: {
    waiting: '',
    live: '',
    ended: ''
  }
};
