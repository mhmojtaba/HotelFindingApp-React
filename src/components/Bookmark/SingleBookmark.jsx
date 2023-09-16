import { useParams } from "react-router-dom";
import { useBookmark } from "../context/BookmarkProvider";
import { useEffect } from "react";
import Loader from "../Loader/Loader";

function SingleBookmark() {
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

  if (isLoading) <Loader />;
  return (
    <div>
      <div className="room">
        <div className="roomDetail">
          <h2>{currentBookmark.name}</h2>
          <div>
            {currentBookmark.cityName} &bull;
            {currentBookmark.country}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleBookmark;
