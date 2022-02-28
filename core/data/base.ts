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

export interface Response {
  state: number;
  content: any;
}

export const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

interface TraitValuesType {
  [key: string]: string;
}

interface ProbabilitiesType {
  [key: string]: TraitValuesType;
}

export const probabilities: ProbabilitiesType = {
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

export enum WalletSate {
  Registered = 0,
  WhiteListed = 1,
  NotWhiteListed = 2,
  Minted = 3,
  Ended = 9,
}

export enum ErrorMessage {
  Success = 200,
  Failed = 400,
  DBError = 900,
  IncorrectWallet = 899,
  AlreadyRegistered = 879,
  NoneResult = 700,
}

export const errorDescription: {[key: number]: string} = {
  [ErrorMessage.Failed]: 'Your request failed. Please try again.',
  [ErrorMessage.DBError]: 'Fetching database error. please try again.',
  [ErrorMessage.IncorrectWallet]: 'The wallet address is not correct. Please check if you signed with your wallet address.',
  [ErrorMessage.AlreadyRegistered]: 'The wallet address is already registered.',
  [ErrorMessage.NoneResult]: 'No data exist.',
}

export const projectSchedule = {
  wYear: 2022,
  wMonth: 2,
  wDay: 24,
  wHour: 0,
  wMin: 0,
  wSec: 0,
  endYear: 2022,
  endMonth: 2,
  endDay: 24,
  endHour: 15,
  endMin: 0,
  endSec: 0,
  stateStr: 'Presale raffle',
};
