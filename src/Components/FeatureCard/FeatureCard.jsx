function FeatureCard({ feature }) {
  return (
      <div className="">
        <div className="flex items-center gap-10 container mx-auto rounded-3xl p-8 bg-gray-100 ">
          <div className="w-1/4 flex justify-center">
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full max-w-45 object-contain"
            />
          </div>
          <div className="w-3/4 border-l-2 border-dashed border-teal-600 pl-10 py-4">
            <h2 className="text-3xl font-bold text-teal-950 mb-4">
              {feature.title}
            </h2>

            <p className="text-gray-600 text-lg leading-9">
              {feature.description}
            </p>
          </div>
        </div>
      </div>
  );
}

export default FeatureCard;
