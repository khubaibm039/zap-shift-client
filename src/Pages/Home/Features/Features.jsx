import { useEffect, useState } from "react";
import FeatureCard from "../../../Components/FeatureCard/FeatureCard";

function Features() {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    fetch("/services.json")
      .then((res) => res.json())
      .then((data) => {
        // Fetch features data
        setFeatures(data.features);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <div className=" border-dashed border-y-2 my-10 ">
        <div className="my-20 w-full h-full flex flex-col items-center justify-center gap-10" >
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature}></FeatureCard>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Features;
