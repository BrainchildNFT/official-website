export enum NftsMenuType {
  About,
  Artist,
  PerksAndUtility,
  TimeLine,
  Enhancements,
  // Gallery,
  WhitePaper
}

export const NftsMenuTypeArr: NftsMenuType[] = [
  NftsMenuType.About,
  NftsMenuType.Artist,
  NftsMenuType.PerksAndUtility,
  NftsMenuType.TimeLine,
  NftsMenuType.Enhancements,
  // NftsMenuType.Gallery,
  NftsMenuType.WhitePaper
]

export const timelineData = [
  {
    isFairmint: false,
    date: 'NOV 2021',
    title: 'Meeting the artist',
    content: 'Quam dui posuere blandit enim. Viverra risus nisi tellus tempor lacus. Cursus odio aliquam mauris eget cursus. Sodales pellentesque et erat facilisis eget laoreet nunc. Praesent mi nunc et, egestas ut vulputate in vulputate ut. ',
  },
  {
    isFairmint: false,
    date: 'NOV 2021',
    title: 'Ethclock Conception',
    content: 'A mattis pellentesque tristique gravida lobortis. In velit at dignissim laoreet elit, amet facilisi massa sit. Mattis aliquet orci pellentesque turpis. Laoreet quisque malesuada gravida dui. Arcu, mattis felis at neque, ut sit.',
  },
  {
    isFairmint: false,
    date: 'NOV 2021',
    title: 'Documentation & Detailing',
    content: 'Porttitor sit id hac sit varius eu adipiscing enim. Pretium sit dolor mauris aenean amet. Nisi, gravida ut et scelerisque ullamcorper aliquet porttitor. Fames quis purus iaculis nisi. Viverra ut lacus, quisque blandit quis sem morbi fusce.',
  },
  {
    isFairmint: false,
    date: 'DEC 2021',
    title: 'Smart Contract Development',
    content: 'Lacus donec cras tempus potenti vulputate eu, at dolor felis. Auctor lorem tortor arcu quisque ipsum. Nisi dictumst consectetur nam cursus auctor. Id venenatis, a, vestibulum pellentesque semper vel augue. ',
  },
  {
    isFairmint: false,
    date: 'DEC 2021',
    title: 'Design Finalisation',
    content: 'Nibh egestas id ut tincidunt et nec, pellentesque tristique. Dignissim a quis ullamcorper semper nullam tempor. Ac turpis amet platea aliquet fames lectus eget. Mollis orci sed at nisl mauris. In pellentesque orci vestibulum pulvinar erat eu ullamcorper amet.',
  },
  {
    isFairmint: true,
    date: 'JAN 2021',
    title: '',
    content: 'We aim to avoid a gas war via a raffle, promote inclusiveness by collecting signatures within 24h period (timezone agnosticism), and only allowing only upto 3 mint per wallet to prevent whale-hoarding. Our process is heavily inspired by Paradigm’s influential research.',
  },
  {
    isFairmint: false,
    date: 'EST. MID FEB 2021',
    title: 'Fairmint Raffle',
    content: 'In viverra tortor, egestas tristique bibendum tortor. Orci integer aenean praesent nisi. Ac egestas nullam pellentesque tincidunt orci eu sed consequat. At egestas duis tincidunt enim fames. ',
  },
];

export const timelineStepData = [
  {
    no: '01',
    name: 'Collecting Signatures',
    content: 'We will collect wallet signatures that interact with our smart contract within a 24 hour window.',
  },
  {
    no: '02',
    name: 'Raffle',
    content: 'Using Chainlink VRF, we will randomly whitelist 420 wallets; these whitelisted wallets will be able to mint Ethclock by sending 0.06 ETH for each NFT during the next phase. The mint will be FCFS for the whitelisted wallet.',
  },
  {
    no: '03',
    name: 'Minting',
    content: 'Whitelisted wallet will be announced on our community channels and website, alternatively, you can also connect your wallet via metamask and find out if you have been whitelisted. You will have 48 hours to mint up to 3 Ethclock directly into your wallet by sending 0.12 ETH for each ethclock. Excess ETH will not be refunded, please do not send any amount other than increments of 0.12 ETH excluding gas fees.',
  },
];

export const enhancementsData = [
  {
    name: 'Levels',
    content: 'Ullamcorper nisi euismod congue posuere vitae pretium hendrerit. ',
  },
  {
    name: 'Rarity Traits',
    content: 'Semper mattis eget venenatis, vitae, viverra cras suspendisse. Elementum egestas morbi feugiat morbi ultrices nulla pellentesque. ',
  },
  {
    name: 'Enhancement Outcomes',
    content: 'Eget id dictum nibh quis fermentum, amet. Semper mattis eget venenatis',
  },
];

export const galleryData = [
  {
    src: '/assets/images/common/ether-clock.png',
    width: 560,
    height: 700,
  },
  {
    src: '/assets/images/common/ether-clock.png',
    width: 560,
    height: 700,
  },
  {
    src: '/assets/images/common/ether-clock.png',
    width: 560,
    height: 700,
  },
];