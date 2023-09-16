import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";
const BASE_URL = "http://localhost:5000";
const HotelContext = createContext();

function HotelProvider({ children }) {
  const [isCurrentHotelLoading, setIsCurrentHotelLoading] = useState(false);
  const [currentHotel, setCurrentHotel] = useState({});
  // getting necessary data from search params and destructure them to fetch data
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;

  const { data: hotels, isLoading } = useFetch(
    `${BASE_URL}/hotels`,
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );

  async function getCurrentHotel(id) {
    try {
      setIsCurrentHotelLoading(true);
      const { data } = await axios.get(`${BASE_URL}/hotels/${id}`);
      setCurrentHotel(data);
      setIsCurrentHotelLoading(true);
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <HotelContext.Provider
      value={{
        hotels,
        isLoading,
        isCurrentHotelLoading,
        currentHotel,
        getCurrentHotel,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
}

export default HotelProvider;

export function useHotel() {
  return useContext(HotelContext);
}
