import { Outlet } from "react-router-dom";
import MapComponent from "../Map/MapComponent";
import { useBookmark } from "../context/BookmarkProvider";

function BookmarkLayout() {
  const { bookmarks, isLoading } = useBookmark();
  //   console.log(bookmarks);
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>

      <MapComponent markerPosition={bookmarks} isMapLoading={isLoading} />
    </div>
  );
}

export default BookmarkLayout;
