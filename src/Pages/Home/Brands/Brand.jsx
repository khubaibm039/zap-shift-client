import { useEffect, useState } from "react";
import Card from "../../../Components/BrandCard/Card";

function Brand() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetch("/services.json")
      .then((res) => res.json())
      .then((data) => setBrands(data.brands));
  }, []);

  // Double the array for seamless infinite loop
  const infiniteBrands = [...brands, ...brands];

  if (!brands.length) return null;

  return (
    <div className="my-24 overflow-hidden">

      {/* Heading */}
      <div className="flex justify-center items-center text-center mb-10">
        <h1 className="font-extrabold text-2xl text-gray-800">
          We've helped thousands of sales teams
        </h1>
      </div>

      {/* Ticker */}
      <div className="relative flex overflow-hidden group">

        {/* Moving track */}
        <div className="flex animate-ticker group-hover:[animation-play-state:paused]">
          {infiniteBrands.map((brand, i) => (
            <div key={`${brand.id}-${i}`} className="shrink-0 mx-4">
              <Card brand={brand} />
            </div>
          ))}
        </div>

        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-white to-transparent z-10" />
      </div>

      <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 20s linear infinite;
          will-change: transform;
        }
      `}</style>
    </div>
  );
}

export default Brand;