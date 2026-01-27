import React from "react";
import ParcelTracking from "../../../assets/New folder/Illustration.png"; // your uploaded image
import safeDalivary from "../../../assets/New folder/Group 4.png"; // your uploaded image
import CallCenter from "../../../assets/New folder/Group 4.png"; // your uploaded image

const features = [
  {
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment’s journey and get instant status updates for complete peace of mind.",
    img: ParcelTracking,
  },
  {
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    img: safeDalivary,
  },
  {
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    img: CallCenter,
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        {features.map((feature, index) => (
          <div
            key={index}
            data-aos={index % 2 !== 0 ? "fade-right" : "fade-left"}
            className={`flex flex-col md:flex-row items-center bg-base-200 rounded-xl p-6 md:p-8 shadow-sm ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="md:w-1/3 flex justify-center mb-4 md:mb-0">
              <img
                src={feature.img}
                alt={feature.title}
                className="h-40 md:h-48 object-contain"
              />
            </div>

            <div className="md:w-2/3 md:pl-8 md:pr-8">
              <h3 className="text-xl md:text-2xl font-bold mb-2">
                {feature.title}
              </h3>
              <p className="text-base-content/80">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
