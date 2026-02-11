import React, { useState } from 'react';
import BangladeshMap from './BangladeshMap';
import { useLoaderData } from 'react-router';




const Coverage = () => {
    const [search, setSearch] = useState("");
    const bangladeshCoverage = useLoaderData();
 


    const filteredLocations = bangladeshCoverage.filter(item =>
    item.district.toLowerCase().includes(search.toLowerCase()) ||
    item.region.toLowerCase().includes(search.toLowerCase())
  );
const focusedLocation =
  filteredLocations.length === 1 ? filteredLocations[0] : null;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-2">
        We are available in 64 Districts
      </h1>
      <p className="text-center text-gray-500 mb-4">
        Zap Shift delivery coverage across Bangladesh
      </p>

      {/* Search */}
      <div className="max-w-md mx-auto mb-4">
  <div className="relative">
    <input
      type="text"
      placeholder="Search district or region..."
      className="input input-bordered w-full pl-10 transition-all duration-300 focus:ring-2 focus:ring-primary focus:scale-[1.02]"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
      🔍
    </span>
  </div>
</div>


      {/* Map */}
      <div className="h-[520px] rounded-xl overflow-hidden shadow-lg">
        <BangladeshMap
  locations={filteredLocations}
  focusedLocation={focusedLocation}
/>

      </div>
    </div>
  );
};

export default Coverage;