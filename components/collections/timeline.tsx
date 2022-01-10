import { timelineData, timelineStepData } from '../../core/data/collections';
import Icon from '../ui-kit/icon';

export default function Timeline() {
  return (<>
    <div className="p-40 md:p-100">
      <p className="text-danger test-16 px-30 py-10">TIMELINE</p>
      <div className="mt-25">
        {timelineData.map((item, index) => (<div key={index}>
          <div className="flex">
            <div className="flex items-center mr-40 relative">
              <div className="w-20 h-20 timeline-item-disc-background rounded-full z-20" />
              <div className="absolute top-0 left-10 bottom-0 w-[1px] z-0">
                <div className={"h-1/2 border-1 border-r-0 bg-primary" + (index === 0 ? ' opacity-0' : ' opacity-30')} />
                <div className={"h-1/2 border-1 border-r-0 bg-primary" + (index === (timelineData.length - 1) ? ' opacity-0' : ' opacity-30')} />
              </div>
            </div>
            <div className="flex flex-col md:flex-row py-20 md:items-center">
              <div className="sm:mr-40 pb-10 sm:pb-0 min-w-300">
                <p className="text-16 text-primary">{item.date}</p>
                {!item.isFairmint && <p className="text-primary font-Subjectivity font-bold mt-10">{item.title}</p>}
                {item.isFairmint && <p className="text-30 text-danger font-Subjectivity font-bold mt-10">Fairmint Raffle</p>}
                {item.isFairmint && <p className="text-primary font-bold mt-10"><span className="text-18 font-medium">Starts</span> 15 January 2021 <br/><span className="text-18 font-medium">at</span> 01:15 AM</p>}
              </div>
              <div>
                <p className="text-16 text-primary font-medium">{item.content}</p>
              </div>
            </div>
          </div>
          {item.isFairmint && <div>
              <div className="flex">
                  <div className="flex items-center mr-40 relative">
                      <div className="absolute top-0 left-10 bottom-0 w-[1px] z-0">
                          <div className="h-full border-1 border-r-0 bg-primary opacity-30" />
                      </div>
                  </div>
                  <div className="grow">
                      <p className="mt-80 text-center text-80 md:text-120 xl:text-180 text-primary font-Subjectivity font-bold break-all">01:23:45:12</p>
                      <p className="mt-80 text-primary pl-100 py-10">How it would unfold...</p>
                    {timelineStepData.map((item, index) => (<div className="flex items-center text-primary text-40 font-Voyage px-50" key={index}>
                      <span className="mr-50">{item.no}</span>
                      <div className="grow border-b border-gradient-dark flex items-center py-20">
                        <p className="grow">{item.name}</p>
                        <span><Icon name="down" color="primary" size={12} /></span>
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