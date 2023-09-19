import { Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useLocation from "../../hooks/useLocation";
import useUrlLatLng from "../../hooks/useUrlLatLng";

function MapComponent({ markerPosition, isMapLoading }) {
  const [mapCenter, setMapCenter] = useState([32.7, 51.7]);
  const [lat, lng] = useUrlLatLng();
  // const [searchParams] = useSearchParams();
  // const lat = searchParams.get("lat");
  // const lng = searchParams.get("lng");
  // console.log(lat, lng);

  const { isLoading: isGettingPosition, position, getPosition } = useLocation();

  // getting the position coords of params
  useEffect(() => {
    const coords = [lat, lng];
    if (coords[0] && coords[1]) setMapCenter(coords);
  }, [lat, lng]);

  // console.log(position);

  // getting the position coords of user geolocation
  useEffect(() => {
    if (position?.lat && position?.lng)
      setMapCenter([position.lat, position.lng]);
  }, [position.lat, position.lng]);

  if (isMapLoading) <Loader />;
  return (
    <div className="mapContainer">
      <MapContainer
        className="map"
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
      >
        <button className="getLocation" onClick={getPosition}>
          {isGettingPosition ? "Loading..." : "your location"}
        </button>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Click />
        <ChangeCenter position={mapCenter} />
        {markerPosition.map((item) => {
          return (
            <Marker key={item.id} position={[item.latitude, item.longitude]}>
              <Popup>
                <div className="searchItem">
                  <div className="searchItemDesc">
                    {item.host_location} <br /> {item.name}
                  </div>
                  <img
                    src={item.picture_url?.url}
                    alt={item.name}
                    width="100"
                    height="100"
                  />
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default MapComponent;

// changing the center view of the map using useMap hook
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function Click() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`/bookmark/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
      // console.log(e.latlng);
    },
  });
  return null;
}
