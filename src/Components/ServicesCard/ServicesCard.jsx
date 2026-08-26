import ServiceIcon from "../../assets/service.png";

const ServicesCard = ({ service }) => {
  const { title, description } = service;
  return (
    <div className="card bg-base-100 shadow-sm h-full hover:bg-primary ">
        <div>
            <img src={ServiceIcon} alt="" className="p-4 rounded-full mx-auto mt-5 bg  bg-linear-to-b from-[#EEEDFC] to-[#c9c6f7] hover:bg-linear-to-t hover:from-[#EEEDFC] hover:to-[#c9c6f7] transition-all duration-300 shadow-sm bg-transparent" />
        </div>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ServicesCard;
