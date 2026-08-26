import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";
import { useRef } from "react";

const Coverage = () => {
  const position = [23.685, 90.35639];
  const serviceCenters = useLoaderData();
  const mapRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const district = serviceCenters.find((center) =>
      center.district.toLowerCase().includes(location.toLowerCase()),
    );

    if (district) {
      const coord = [district.latitude, district.longitude];
      mapRef.current.flyTo(coord, 12);
      console.log(district, coord);
    } else {
      // alert("Sorry, we do not have service in that location yet.");
    }
  };

  return (
    <div className=" bg-white rounded-2xl mb-20">
      <div className="max-w-6xl mx-auto py-20 px-4 ">
        <h2 className="text-5xl font-extrabold">
          We are available in 64 districts
        </h2>
        <div>
          <form action="" onSubmit={handleSearch} className="w-[43.5%]">
            <label className="flex justify-center items-center relative">
             <div className="input validator join-item rounded-4xl my-12 w-full border-none focus:ring-0 outline-0  bg-[#EAECED]">
               <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <g 
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
                type="search"
                className="border-none focus:ring-0 w-full "
                placeholder="Search here"
                name="location"
              />
             </div>
              <button className="btn btn-neutral join-item rounded-4xl w-1/5 bg-primary text-black border-none shadow-none absolute right-0">
                Search
              </button>
            </label>
          </form>
        </div>
        <div className="w-full h-120 "> 
          <div>
            <p className="font-extrabold text-3xl my-12">We deliver almost all over Bangladesh</p>
          </div>
          <MapContainer
            center={position}
            zoom={8}
            scrollWheelZoom={true}
            className="h-100 rounded-2xl"
            ref={mapRef}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {serviceCenters.map((center, index) => (
              <Marker
                key={index}
                position={[center.latitude, center.longitude]}>
                <Popup>
                  <strong>
                    {center.district} <br />
                    Service Area:{center.covered_area.join(", ")}
                  </strong>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Coverage;
