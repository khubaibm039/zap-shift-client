import { useEffect, useState } from "react";
import HIWCard from "../../../Components/HIW/HIWCard";

function App() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("/services.json")
      .then((res) => res.json())
      .then((data) => {
        setServices(data.howItWorks.services);
      });
  }, []);

  return (
    <div className="container  mx-auto px-20 py-18">
      <h1 className="text-3xl font-extrabold pb-8">How It Works</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {services.map((service) => (
          <HIWCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}

export default App;
