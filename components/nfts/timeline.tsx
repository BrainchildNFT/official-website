import { timelineData, timelineStepData } from '../../core/data/nfts'
import Icon from '../ui-kit/icon'
import { useState } from 'react'

interface Props {
  time: string
}

export default function Timeline({ time }: Props) {
  const [opendUnholdIndex, setOpenedUnholdIndex] = useState([
    false,
    false,
    false,
  ])

  const openUnhold = (index: any) => {
    const arr = opendUnholdIndex
    arr[index] = !arr[index]
    setOpenedUnholdIndex(arr)
  }

  return (
    <>
      <div className="p-15 sm:p-40 lg:p-100">
        <p className="text-danger test-16 px-30 py-10">TIMELINE</p>
        <div className="mt-25">
          {timelineData.map((item, index) => (
            <div key={index}>
              <div className="flex">
                <div className="flex items-center mr-10 sm:mr-40 relative">
                  <div className="w-20 h-20 timeline-item-disc-background rounded-full z-20" />
                  <div className="absolute top-0 left-10 bottom-0 w-[1px] z-0">
                    <div
                      className={
                        'h-1/2 border-1 border-r-0 bg-primary' +
                        (index === 0 ? ' opacity-0' : ' opacity-30')
                      }
                    />
                    <div
                      className={
                        'h-1/2 border-1 border-r-0 bg-primary' +
                        (index === timelineData.length - 1
                          ? ' opacity-0'
                          : ' opacity-30')
                      }
                    />
                  </div>
                </div>
                <div className="py-20 grow">
                  <div className="pr-20 sm:pr-0 sm:mr-40 pb-10 sm:pb-0 flex flex-col-reverse sm:flex-row w-full justify-between items-center">
                    {!item.isFairmint && (
                      <p className="text-primary font-Subjectivity font-bold text-center">
                        {item.title}
                      </p>
                    )}
                    {item.isFairmint && (
                      <p className="text-primary font-Subjectivity font-bold text-center">
                        Presale Raffle
                      </p>
                    )}
                    <p className="text-16 text-primary">{item.date}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
