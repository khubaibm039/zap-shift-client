import { useEffect, useState } from "react";
import ServicesCard from "../../../Components/ServicesCard/ServicesCard";

function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("/services.json")
      .then((response) => response.json())
      .then((data) => {
        setServices(data.ourServices.services);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="bg-secondary rounded-2xl">
      <div className="flex flex-col items-center justify-center text-center container mx-auto p-20 ">
        <div className="text-white">
          <h1 className="text-4xl font-extrabold">Our Services</h1>
          <p className="mt-4 wrap-normal font-medium text-l">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to  <br/> business shipments — we
            deliver on time, every time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {services.map((service) => (
            <ServicesCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;
