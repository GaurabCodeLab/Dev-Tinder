import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../utils/constants";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { addConnections } from "../redux/slices/connectionSlice";

const Connections = () => {
  const connections = useSelector((state) => state.connections.data);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      setLoading(false);
      dispatch(addConnections(response.data.data));
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
    <div className="flex-1">
      {loading && (
        <div className="fixed inset-0 bg-white/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent" />
        </div>
      )}
      {connections && connections.length > 0 && (
        <h2 className="text-3xl font-bold text-center mb-4">Connections</h2>
      )}

      <div className="flex flex-col gap-5 px-4 md:px-0">
        {connections && connections.length > 0 ? (
          connections.map((connection) => (
            <div
              className="card card-side bg-base-300 shadow-sm h-35 md:w-1/2 mx-auto"
              key={connection._id}
            >
              <figure className="w-[30%]">
                <img
                  src={connection.photoUrl}
                  alt="Movie"
                  className="w-full h-auto object-contain"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-2xl">
                  {connection.firstName + " " + connection.lastName}
                </h2>
                <p>{connection.age + ", " + connection.gender}</p>
                <p>{connection.about}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center mt-6 text-2xl font-bold">
            No connections found
          </p>
        )}
      </div>
    </div>
  );
};

export default Connections;
