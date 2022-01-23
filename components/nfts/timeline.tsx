import { timelineData, timelineStepData } from '../../core/data/nfts';
import Icon from '../ui-kit/icon';
import { useState } from 'react';

interface Props {
  time: string;
}

export default function Timeline({ time } : Props) {
  const [opendUnholdIndex, setOpenedUnholdIndex] = useState([false, false, false]);

  const openUnhold = (index: any) => {
    const arr = opendUnholdIndex;
    arr[index] = !arr[index];
    setOpenedUnholdIndex(arr);
  }

  return (<>
    <div className="p-15 sm:p-40 lg:p-100">
      <p className="text-danger test-16 px-30 py-10">TIMELINE</p>
      <div className="mt-25">
        {timelineData.map((item, index) => (<div key={index}>
          <div className="flex">
            <div className="flex items-center mr-10 sm:mr-40 relative">
              <div className="w-20 h-20 timeline-item-disc-background rounded-full z-20" />
              <div className="absolute top-0 left-10 bottom-0 w-[1px] z-0">
                <div className={"h-1/2 border-1 border-r-0 bg-primary" + (index === 0 ? ' opacity-0' : ' opacity-30')} />
                <div className={"h-1/2 border-1 border-r-0 bg-primary" + (index === (timelineData.length - 1) ? ' opacity-0' : ' opacity-30')} />
              </div>
            </div>
            <div className="py-20 grow">
              <div className="pr-20 sm:pr-0 sm:mr-40 pb-10 sm:pb-0 flex flex-col-reverse sm:flex-row w-full justify-between items-center">
                {!item.isFairmint && <p className="text-primary font-Subjectivity font-bold text-center">{item.title}</p>}
                {item.isFairmint && <p className="text-primary font-bold text-center sm:text-left grow"><span className="text-25 text-danger font-Subjectivity font-bold mr-10">Presale Raffle</span><span className="text-18 font-medium">Starts</span> 24 January 2022 <br/><span className="text-18 font-medium">at</span> 00:00 AM UTC</p>}
                <p className="text-16 text-primary">{item.date}</p>
              </div>
            </div>
          </div>
          {item.isFairmint && <div>
              <div className="flex">
                  <div className="flex items-center mr-10 sm:mr-40 relative">
                      <div className="absolute top-0 left-10 bottom-0 w-[1px] z-0">
                          <div className="h-full border-1 border-r-0 bg-primary opacity-30" />
                      </div>
                  </div>
                  <div className="grow">
                      <p className="mt-40 sm:mt-80 text-center text-80 md:text-100 xl:text-150 text-primary font-Subjectivity font-bold break-all">{time}</p>
                      <p className="mt-80 text-primary pl-30 sm:pl-50 lg:pl-100 py-10">How it would unfold...</p>
                    {timelineStepData.map((item, index) => (<div className="flex flex-col sm:flex-row items-start text-primary text-40 pl-20 sm:px-50" key={index}>
                      <span className="w-full text-center sm:w-auto sm:mr-50 font-Future pt-40 sm:py-20">{item.no}</span>
                      <div className="grow w-full border-b border-gradient-dark py-20">
                        <div className="flex items-center cursor-pointer" onClick={() => openUnhold(index)}>
                          <p className="grow font-Future">{item.name}</p>
                          <span><Icon className={opendUnholdIndex[index] ? 'transition-all duration-200 rotate-180' : 'transition-all duration-200 '} name="down" color="primary" size={12} /></span>
                        </div>
                        <p className={"mt-20 text-20 leading-tight transition-all duration-200 " + (opendUnholdIndex[index] ? 'block' : 'hidden')}>{item.content}</p>
                      </div>
                    </div>))}
                  </div>
              </div>
          </div>}
        </div>))}
      </div>
    </div>
  </>);
}