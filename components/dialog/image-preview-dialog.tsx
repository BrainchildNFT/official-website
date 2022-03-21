import Image from 'next/image';
import Icon from '../ui-kit/icon';


interface Props {
  src: string;
  alt: string;
  closeDialog: () => void;
}

export function ImagePreviewDialog({src, alt, closeDialog}: Props) {
  return (
    <div className="w-screen h-screen md:w-600 md:h-400 lg:w-800 lg:h-600 xl:w-1000 xl:h-700 2xl:w-1400 2x:h-1000">
      <div className="absolute top-0 w-full flex justify-end z-10 pt-30 pr-30 md:pt-15 md:pr-15">
        <button className="px-5 pt-5 rounded-full overflow-hidden bg-white opacity-90" onClick={closeDialog}>
          <Icon name="close" color="#2c2c2c" size={14}/>
        </button>
      </div>
      <div className="absolute top-0 w-full h-full flex items-center">
        <Image src={src} layout="fill" objectFit="cover" alt={alt}/>
      </div>
    </div>);
}

ImagePreviewDialog.defaultProps = {
  alt: '',
  closeDialog: () => {
  },
};
