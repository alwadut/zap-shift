import Marquee from "react-fast-marquee";

// Brand logos
import amazon from "../../../assets/brands/amazon.png";
import amazonVector from "../../../assets/brands/amazon_vector.png";
import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import startPeople from "../../../assets/brands/start-people.png";
import start from "../../../assets/brands/start.png";

const BrandSliders = () => {
  const brands = [
    amazon,
    amazonVector,
    casio,
    moonstar,
    randstad,
    startPeople,
    start,
  ];

  return (
    <section className="py-14 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">
            Trusted by Companies
          </h2>
          <p className="text-base-content/70 mt-2">
            We’ve worked with leading companies across the World
          </p>
        </div>

        <Marquee.default speed={50} pauseOnHover={false} gradient={false} autoFill>
          {brands.map((logo, index) => (
            <div key={index} className="mx-12">
              <img
                src={logo}
                alt="Company logo"
                className="h-6 md:h-8  object-contain"
              />
            </div>
          ))}
        </Marquee.default>
          <div className="divider mt-10"></div>
      </div>
    </section>
  );
};

export default BrandSliders;
