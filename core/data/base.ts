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

export const probabilities = {
  'Environment': {
    'Smart Contract': '4%',
    'Near Future':    '8%',
    'Reneqade Node':  '16%',
    'Depths of Defi': '32%',
    'Gas Belt':       '40%',
    'Pending':        '0%',
  },
  'Shine': {
    'Marble':         '10%',
    'Steel':          '15%',
    'Patina':         '20%',
    'Timber':         '25%',
    'Acrylic':        '30%',
    'Pending':        '0%',
  },
  'Efficiency': {
    'Pristine':       '15%',
    'Brilliant':      '20%',
    'Polished':       '30%',
    'Raw':            '20%',
    'Flawed':         '15%',
    'Pending':        '0%',
  }
};

export const projectSchedule = {
  wYear: 2022,
  wMonth: 2,
  wDay: 9,
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
