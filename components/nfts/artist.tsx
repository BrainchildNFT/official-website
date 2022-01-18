import Icon from '../ui-kit/icon';

export default function Artist() {
  return (<>
    <div className="w-full artists-background text-white relative">
      <div className="relative z-0">
        <video id="background-video" autoPlay loop muted poster="https://assets.codepen.io/6093409/river.jpg">
          <source src="/assets/images/nfts/artists.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="absolute top-0 h-full container mx-auto pb-100 z-10 flex flex-col justify-end">
        <p className="text-16 font-light">THE ARTIST</p>
        <p className="text-60 font-Future pt-10">Qvarta Studio</p>
        <p className="font-light pt-40">Qvarta has a unique Balto-Slavic aesthetic that is clean and luxurious. With the end-user in mind, they have achieved a delicate balance between the user's emotional experience, aesthetics and functionality. Their love for industrial design means that they will either make a product that is cool in all aspects, or they won’t make it at all.</p>
        <p className="font-light pt-10 text-right cursor-pointer">Learn more <Icon name='external_link' color="white" size={18} /></p>
      </div>
    </div>
  </>);
}