import Image from 'next/image';
import { enhancementsData } from '../../core/data/nfts';
import Icon from '../ui-kit/icon';

export default function Enhancements() {
  return (<>
    <div className="p-40 md:p-100">
      <p className="p-10 text-danger text-16 font-medium">ENHANCEMENTS</p>
      <div className="flex flex-col md:flex-row mt-10">
        <div className="md:w-1/2">
          <p className="text-18 text-primary font-light p-10">Ullamcorper nisi euismod congue posuere vitae pretium hendrerit. Eget id dictum nibh quis fermentum, amet. Semper mattis eget venenatis, vitae, viverra cras suspendisse. Elementum egestas morbi feugiat morbi ultrices nulla pellentesque. </p>
        </div>
        <div className="md:w-1/2 px-10 md:pl-50">
          {enhancementsData.map((item, index) => (<div key={index} className={"flex items-center justify-between border-b border-gradient-dark pb-20 " + (index !== 0 ? "pt-20" : "")}>
            <div>
              <p className="text-40 text-primary font-Voyage">{item.name}</p>
              <p className="text-16 font-light text-primary mt-10">{item.content}</p>
            </div>
            <span><Icon name="down" color="primary" size={16} /></span>
          </div>))}
        </div>
      </div>

      <div className="mt-100 flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <p className="p-10 text-60 font-Voyage text-primary">Grant of Lustre</p>
        </div>
        <div className="md:w-1/2 p-50">
          <Image
            src="/assets/images/landing-page/eth-clock-design.png"
            layout="intrinsic"
            width={505}
            height={564}
            alt="Ethereum Clock Design"
          />
        </div>
      </div>
    </div>
  </>);
}