import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import slide_image_1 from "./../../assets/banner1.png";
import slide_image_2 from "./../../assets/banner2.png";
import slide_image_3 from "./../../assets/banner3.png";

export const Banner = () => {
	return (
		<Swiper
			effect="coverflow"
			coverflowEffect={{
				rotate: 0,
				stretch: 0,
				depth: 100,
				modifier: 2.5,
			}}
			autoplay={{
				delay: 2500,
				disableOnInteraction: false,
			}}
			pagination={{ el: ".swiper-pagination", clickable: true }}
			navigation
			modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
			className="swiper_container max-w-7xl"
		>
			<SwiperSlide>
				<img src={slide_image_1} className="w-full" alt="slide_image" />
			</SwiperSlide>
			<SwiperSlide>
				<img src={slide_image_2} className="w-full" alt="slide_image" />
			</SwiperSlide>
			<SwiperSlide>
				<img src={slide_image_3} className="w-full" alt="slide_image" />
			</SwiperSlide>
		</Swiper>
	);
};
