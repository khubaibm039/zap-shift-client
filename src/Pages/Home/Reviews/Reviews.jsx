"use client";
import { use } from "react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import ReviewCard from "../../../Components/ReviewCard/ReviewCard";
import CustomerTop from "../../../assets/customer-top.png";

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);

  return (
    <section className="py-20 px-20 rounded-2xl bg-linear-to-b from-gray-50 to-white overflow-hidden">

      {/* Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <img src={CustomerTop} alt="" className="mb-4 max-w-24 opacity-80" />
        <h3 className="font-bold text-3xl text-gray-800 mb-4">
          What our customers are saying
        </h3>
        <p className="text-gray-500 text-sm max-w-lg leading-relaxed">
          Enhance posture, mobility, and well-being effortlessly with Posture Pro.
          Achieve proper alignment, reduce pain, and strengthen your body with ease!
        </p>
      </div>

      {/* Swiper */}
      <Swiper
        modules={[EffectCoverflow, Pagination, Autoplay]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView="2"
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 0,        // ✅ no tilt, clean modern look
          stretch: 0,       // ✅ must be a number, not '50%'
          depth: 150,       // ✅ side cards pushed back in Z
          modifier: 2,
          scale: 0.85,      // ✅ side cards slightly smaller
          slideShadows: false,
        }}
        pagination={{ clickable: true }}
        className="w-full "
      >
        {reviews.map((review) => (
          <SwiperSlide
            key={review.id}
            style={{ width: "320px" }}
            className="py-6"
          >
            {({ isActive }) => (
              <div
                className={`transition-all duration-500 ${
                  isActive ? "opacity-100 scale-100" : "opacity-50 scale-90"
                }`}
              >
                <ReviewCard review={review} />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination dot styles */}
      <style>{`
        .swiper-pagination-bullet {
          background: #9ca3af;
          opacity: 0.5;
          width: 8px;
          height: 8px;
        }
        .swiper-pagination-bullet-active {
          background: #111827;
          opacity: 1;
          width: 24px;
          border-radius: 4px;
          transition: width 0.3s ease;
        }
      `}</style>
    </section>
  );
};

export default Reviews;