import { useNavigate, useParams } from "react-router-dom";
import { useBookmark } from "../context/BookmarkProvider";
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";

function SingleBookmark() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    getCurrentBookmark,
    isCurrentBookmarkLoading: isLoading,
    currentBookmark,
  } = useBookmark();
  //   console.log(currentBookmark);
  useEffect(() => {
    getCurrentBookmark(id);
  }, [id]);

  const backHandle = () => {
    navigate(-1);
  };

  if (isLoading) <Loader />;
  return (
    <div>
      <div>
        <div>
          <button onClick={backHandle} className="btn btn--back">
            &larr; back
          </button>
          <h2>{currentBookmark.name}</h2>
          <div>
            <ReactCountryFlag countryCode={currentBookmark.countryCode} svg />
            &nbsp;<strong>{currentBookmark.cityName}</strong>&nbsp;
            <span>{currentBookmark.country}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleBookmark;
