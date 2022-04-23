export enum RaffleState {
  Waiting = 0,
  Live = 1,
  Ended = 2,
}

export const faq_display_limit = 6;

export const faqs = {
  data: [
    {
      name: 'What is BrainchildNFT?',
      content:
        'NFTs that embody a gamified experience of potential enhancements combined with perpetual redemption.',
    },
    {
      name: 'What does “Perpetually Redeemable” mean?',
      content:
        'BrainchildNFT is eternal, the owner can always receive it in real life, infinitely.',
    },
    {
      name: 'What is EthClock?',
      content:
        'EthClock (aka Ethereum-Clock) is our first brainchildNFT consisting of 5,000 luxurious clocks! ',
    },
    {
      name: 'When do EthClocks go on sale?',
      content: 'Join our Discord server to for the latest information about our multi-stage Fairmint Raffle.',
    },
    {
      name: 'How many EthClocks are available?',
      content:
        'Out of 5,000 EthClock NFTs, 4207 of them will be available for public sale!',
    },
    {
      name: 'How do I buy EthClock?',
      content:
        'Join our Discord server to for the latest information.',
    },
    {
      name: 'What is the answer to life?',
      content: '42',
    },
  ],
};

export const nftList = {
  images: [
    {
      name: `Enhance\nments`,
      image: '/assets/images/nfts/nft-floor-with-fountain.png',
      content:
        'Play with our mysterious dice to test your luck and evolve your NFTs to higher levels.\nRoll the dice for 5 possible outcomes of enhancement!\nFROZEN\nCHARRED\nFAILED\nGOD-TIER\nENHANCED',
      width: 370,
      height: 400,
    },
    {
      name: `Redeem`,
      image: '/assets/images/nfts/nft-redeem.jpg',
      content:
        'Get the physical manifestation of your NFT delivered right to your front door.Touch it. Feel it. Lick it. Get weird with it. Throw it and redeem again.It’s yours, FOREVER.Our NFTs are perpetually redeemable.',
      width: 370,
      height: 400,
    },
    {
      name: `Participate`,
      image: '/assets/images/nfts/nft-coming-soon.jpg',
      content:
        'You will be given digital tickets and gain entry to our private community events and receive exclusive benefits including premium NFT drops, lavish collaborations, gamified experiences and a whole lot more...',
      width: 370,
      height: 400,
    },
    {
      name: `Vote`,
      image: '/assets/images/nfts/nft-coming-soon.jpg',
      content:
        'Have your say in how things will turn out, from launches, collaborations  to designs and features. Be one of the many potter hands to mold future brainchild projects!',
      width: 370,
      height: 400,
    },
  ],
};
