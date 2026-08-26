import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({ review }) => {
    const { userName, user_photoURL, reviewss } = review;
  return (
    <div className="flex items-center justify-center">
      {/* Main Card */}
      <div className="card w-105 bg-white rounded-4xl p-8 shadow-sm">
        <div className="card-body p-0">
          {/* Quote Icon */}
          <div className="text-[#a5d1d5] text-5xl mb-2">
            <FaQuoteLeft />
          </div>

          {/* Testimonial Text */}
          <p className="text-gray-600 text-lg leading-relaxed">
            {reviewss}
          </p>

          {/* Dashed Divider */}
          <div className="border-t-2 border-dashed border-[#0f4d54] my-6 opacity-40"></div>

          {/* Author Section */}
          <div className="flex items-center gap-4">
            {/* Avatar Circle */}
            <div className="avatar">
             <img className="rounded-full w-14 h-14" src={user_photoURL} alt="" />
            </div>

            {/* Author Details */}
            <div>
              <h3 className="font-bold text-[1.15rem] text-[#0f4d54]">
                {userName}
              </h3>
              <p className="text-gray-500 text-sm mt-0.5">
                Senior Product Designer
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
