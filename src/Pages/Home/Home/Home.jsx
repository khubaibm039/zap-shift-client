import Banner from "../Banner/Banner";
import Brand from "../Brands/Brand";
import Faq from "../Faq/Faq";
import Features from "../Features/Features";
import HowItsWork from "../HowItsWork/HowItsWork";
import Reviews from "../Reviews/Reviews";
import Services from "../Services/Services";


const reviewsPromise = fetch('/reviews.json').then(res=> res.json())

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <HowItsWork></HowItsWork>
      <Services></Services>
      <Brand></Brand>
      <Features></Features>
      <Faq></Faq>
      <Reviews reviewsPromise={reviewsPromise}></Reviews>
    </div>
  );
};

export default Home;
