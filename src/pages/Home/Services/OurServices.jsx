import ServiceCard from "./ServiceCard";
import { servicesData } from "./servicesData";


const OurServices = () => {
  return (
    <section className="py-16 bg-[#03373D] mt-10 rounded-2xl">
      <div className="max-w-7xl mx-auto px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Services
          </h2>
          <p className="">
            We provide reliable, fast, and secure logistics solutions tailored
            for businesses of all sizes across Bangladesh.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {servicesData.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default OurServices;
