import { useNavigate } from "react-router-dom";

export function BackButton() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <button onClick={goBack} className="mt-5 ms-4 underline">Go Back</button>
    </div>
  );
}
