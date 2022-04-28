import Icon from '../ui-kit/icon';

export default function Artist() {
  const goToQvatar = () => {
    window.open('https://qvarta.com/en/works/', '_blank');
  };

  return (<>
    <div className="w-full text-white relative">
      <div className="relative z-0">
        <video className="w-full" id="background-video" autoPlay loop muted>
          <source src="/assets/images/nfts/artists.mp4" type="video/mp4"/>
        </video>
      </div>
      <div
        className="absolute top-0 h-full w-full px-15 sm:px-40 lg:px-100 pb-30 lg:pb-80 z-10 flex flex-col justify-end">
        <h1 className="text-16 font-light">THE ARTIST</h1>
        <p className="text-50 sm:text-60 font-Future pt-10">Qvarta Studio</p>
        <p className="font-light pt-40 hidden md:block">Qvarta has a unique Balto-Slavic aesthetic that is clean and
          luxurious. With the end-user in mind, they have achieved a delicate balance between the user&apos;s emotional
          experience, aesthetics and functionality. Their love for industrial design means that they will either make a
          product that is cool in all aspects, or they won’t make it at all.</p>
        <p className="font-light pt-10 text-right cursor-pointer" onClick={() => goToQvatar()}>Learn more <Icon
          name="external_link" color="white" size={18}/></p>
      </div>
    </div>
  </>);
}
