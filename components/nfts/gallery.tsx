import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { shimmerUrl } from '../ui-kit/common/blur-image';
import { galleryData } from '../../core/data/nfts';
import useMatchBreakpoints from '../ui-kit/common/useMatchBreakpoints';

const swiperBreakPoints = {
  640: {
    width: 640,
    slidesPerView: 1,
  },
  768: {
    width: 768,
    slidesPerView: 1.1,
  },
  1024: {
    width: 1024,
    slidesPerView: 2.1,
  },
}

export default function Gallery() {

  const { isHuge } = useMatchBreakpoints()

  return (<>
    <div className={"p-40 md:p-100 pr-0 overflow-hidden " + (isHuge ? "collection-body-width" : " w-screen")}>
      <Swiper
        className="w-full"
        spaceBetween={10}
        breakpoints={swiperBreakPoints}
      >
        {galleryData.map((item, i) => (<>
          <SwiperSlide className="flex-grow" key={i}>
            <div className="border border perk-and-utility-item-border">
              <Image
                className="overflow-hidden cursor-pointer relative z-0"
                src={item.src}
                width={item.width}
                height={item.height}
                layout="responsive"
                alt={"NFT Image " + (i+1)}
                placeholder="blur"
                blurDataURL={shimmerUrl}
              />
            </div>
            <div className="absolute top-0 left-0 w-full h-full gallery-item-background border gallery-item-border" />
          </SwiperSlide>
        </>))}
      </Swiper>
    </div>
  </>);
}