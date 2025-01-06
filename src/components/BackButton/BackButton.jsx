import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();
  const backHandle = (e) => {
    e.preventDefault();
    navigate(-1);
  };
  return (
    <div>
      <button onClick={backHandle} className="btn btn--back">
        &larr; back
      </button>
    </div>
  );
}

export default BackButton;
