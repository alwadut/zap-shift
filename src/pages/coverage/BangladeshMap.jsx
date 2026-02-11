import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

const FlyToLocation = ({ location }) => {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.flyTo(
        [location.latitude, location.longitude],
        10,
        { duration: 1.5 }
      );
    }
  }, [location, map]);

  return null;
};

const BangladeshMap = ({ locations ,focusedLocation }) => {
  return (
    <MapContainer
      center={[23.685, 90.3563]}
      zoom={7}
      className="h-full w-full"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
<FlyToLocation location={focusedLocation} />

      {locations.map((item, index) => (
        <Marker
          key={index}
          position={[item.latitude, item.longitude]}
        >
          <Popup>
            <div className="space-y-1">
              <h3 className="font-bold">{item.district}</h3>
              <p className="text-sm">Region: {item.region}</p>
              <p className="text-sm">
                Covered Areas:
                <br />
                {item.covered_area.join(", ")}
              </p>
              <span className="badge badge-success badge-sm">
                {item.status}
              </span>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default BangladeshMap;
