import Icon from '../ui-kit/icon';

export default function Artist() {
  return (<>
    <div className="w-full artists-background text-white">
      <div className="container mx-auto">
        <p className="text-16 font-light pt-300 sm:pt-400 lg:pt-520">THE ARTIST</p>
        <p className="text-60 font-Future pt-10">Qvarta Studio</p>
        <p className="font-light pt-100">Ullamcorper nisi euismod congue posuere vitae pretium hendrerit. Eget id dictum nibh quis fermentum, amet. Semper mattis eget venenatis, vitae, viverra cras suspendisse. Elementum egestas morbi feugiat morbi ultrices nulla pellentesque.</p>
        <p className="font-light pt-10 pb-100 text-right">Learn more <Icon name='external_link' color="white" size={18} /></p>
      </div>
    </div>
  </>);
}