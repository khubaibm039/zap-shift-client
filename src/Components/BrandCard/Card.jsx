
const Card = ({brand}) => {
    const {image} = brand;
    return (
        <div>
             <img src={image} alt={brand.name}  />
        </div>
    );
};

export default Card;