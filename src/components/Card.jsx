import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import Swal from "sweetalert2";
import useFetchFeed from "../hooks/useFetchFeed";
import { useState, useEffect } from "react";

const Card = ({ data, use }) => {
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [status, setStatus] = useState("");
  const { fetchFeed } = useFetchFeed();

  useEffect(() => {
    let timer;
    if (showToast) {
      timer = setTimeout(() => {
        setShowToast(false);
        setLoading(false);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [showToast]);

  const { firstName, lastName, about, age, gender, photoUrl, _id } = data;

  const handleRequest = async (status, id) => {
    try {
      setLoading(true);
      setStatus(status);
      await axios.post(
        API_BASE_URL + `/request/send/${status}/${id}`,
        {},
        { withCredentials: true },
      );
      setShowToast(true);
      fetchFeed();
    } catch (error) {
      setLoading(false);
      const errorMessage =
        error?.response?.data?.message || "something went wrong";
      console.error(errorMessage);
      Swal.fire({
        icon: "error",
        text: errorMessage,
      });
    }
  };

  return (
    <div className="card bg-base-300 md:w-96 w-80 shadow-sm h-150">
      {showToast && (
        <div className="toast toast-top toast-center mt-12">
          <div className="alert alert-success">
            <span>
              {status === "interested"
                ? "connection sent successfully"
                : "connection rejected successfully"}
            </span>
          </div>
        </div>
      )}
      <figure>
        <img src={photoUrl} alt="user photo" className="w-full h-auto" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-xl">{firstName + " " + lastName}</h2>
        <h4>{age + " " + gender} </h4>
        <p>{about}</p>
        {use !== "profile" && (
          <div className="card-actions justify-center mt-4 gap-3">
            <button
              className="btn btn-primary"
              disabled={loading}
              onClick={() => handleRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              disabled={loading}
              onClick={() => handleRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
