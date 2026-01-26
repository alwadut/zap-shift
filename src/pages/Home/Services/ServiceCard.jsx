const ServiceCard = ({ service }) => {
  const Icon = service.icon;

  return (
    <div className="card bg-base-200 hover:bg-lime-500 transition-all duration-300 hover:-translate-y-1">
      <div className="card-body flex flex-col justify-center items-center">
        
        {/* Icon */}
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
          <Icon className=" text-2xl" />
        </div>

        {/* Title */}
        <h3 className="card-title text-lg font-semibold">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-center text-base-content/70">
          {service.description}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
