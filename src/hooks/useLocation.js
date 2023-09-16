import { useState } from "react";

export default function useLocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser needs geolocation");
    setIsLoading(true);

    // use web api browser navigator to get the location coords
    navigator.geolocation.getCurrentPosition(
      (loc) => {
        setPosition({
          lat: loc.coords.latitude,
          lng: loc.coords.longitude,
        });
        setIsLoading(false);
      },
      (err) => {
        setIsLoading(false);

        setError(err.message);
      }
    );
  }

  return { isLoading, position, error, getPosition };
}
