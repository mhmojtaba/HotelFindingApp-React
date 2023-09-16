import { useSearchParams } from "react-router-dom";

function AddBookmark() {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  console.log([lat, lng]);
  return <div>Add a bookmark</div>;
}

export default AddBookmark;
