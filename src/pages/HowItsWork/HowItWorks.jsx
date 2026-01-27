import { FaMapMarkedAlt, FaMoneyBillWave, FaWarehouse, FaBuilding, FaTruck, FaUndo } from "react-icons/fa";

const howItWorksData = [
  {
    id: 1,
    title: "Booking Pick & Drop",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
    icon: <FaMapMarkedAlt />,
  },
  {
    id: 2,
    title: "Cash On Delivery",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
    icon: <FaMoneyBillWave />,
  },
  {
    id: 3,
    title: "Delivery Hub",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
    icon: <FaWarehouse />,
  },
  {
    id: 4,
    title: "Booking SME & Corporate",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
    icon: <FaBuilding />,
  },
  
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-base-200 mt-10 rounded-2xl">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-2xl md:text-3xl font-bold mb-10">
          How it Works
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1  md:grid-cols-4 gap-6">
          {howItWorksData.map((item) => (
            <div
              key={item.id}
              className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="card-body">
                <div className="text-3xl text-primary mb-4">
                  {item.icon}
                </div>
                <h3 className="card-title text-lg">{item.title}</h3>
                <p className="text-sm opacity-70">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
