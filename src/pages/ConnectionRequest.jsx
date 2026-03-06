import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { addRequests } from "../redux/slices/requestSlice";
import Swal from "sweetalert2";

const ConnectionRequest = () => {
  const requests = useSelector((state) => state.requests.data);
  const [status, setStatus] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchConnectionRequest();
  }, []);

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

  const fetchConnectionRequest = async () => {
    try {
      const response = await axios.get(
        API_BASE_URL + "/user/requests/received",
        { withCredentials: true },
      );
      dispatch(addRequests(response.data.data));
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "something went wrong";
      console.error(errorMessage);
      Swal.fire({
        icon: "error",
        text: errorMessage,
      });
    }
  };

  const handleReview = async (status, id) => {
    try {
      setLoading(true);
      await axios.post(
        API_BASE_URL + `/request/review/${status}/${id}`,
        {},
        { withCredentials: true },
      );
      setStatus(status);
      setShowToast(true);
      fetchConnectionRequest();
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
    <div>
      <div className="flex flex-col gap-5">
        {requests && requests.length > 0 && (
          <h2 className="text-4xl font-bold text-center my-4">
            Connection Requests
          </h2>
        )}
        {showToast && (
          <div className="toast toast-top top-15 z-1000 toast-center">
            <div className="alert alert-success">
              <span>Connection {status} successfully</span>
            </div>
          </div>
        )}
        {requests && requests.length > 0 ? (
          requests.map((request) => (
            <div
              className="card card-side bg-base-300 shadow-sm h-35 w-1/2 mx-auto"
              key={request._id}
            >
              <figure>
                <img src={request.fromUserId.photoUrl} alt="Movie" />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-2xl">
                  {request.fromUserId.firstName +
                    " " +
                    request.fromUserId.lastName}
                </h2>
                <p>
                  {request.fromUserId.age + ", " + request.fromUserId.gender}
                </p>
                <p>{request.fromUserId.about}</p>
              </div>
              <div className="flex items-center pe-6 gap-4">
                <button
                  className="btn btn-primary"
                  disabled={loading}
                  onClick={() => handleReview("accepted", request._id)}
                >
                  Accept
                </button>
                <button
                  className="btn btn-secondary"
                  disabled={loading}
                  onClick={() => handleReview("rejected", request._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center mt-6 text-2xl font-bold">
            No Connection Request Found
          </p>
        )}
      </div>
    </div>
  );
};

export default ConnectionRequest;
