import Icon from "../../assets/bookingIcon.png";

const HIWCard = ({ service }) => {
  const { title, description } = service;
  return (
    <div>
      <div className="card card-dash bg-base-100 w-auto">
        <div className="card-body">
            <div className="w-16 h-16 mb-5">
                <img src={Icon} alt="" />
            </div>
          <div>
            <h2 className="card-title">{title}</h2>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HIWCard;
