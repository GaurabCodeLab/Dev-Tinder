import axios from "axios";
import { useEffect } from "react";
import { API_BASE_URL } from "../utils/constants";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { addConnections } from "../redux/slices/connectionSlice";

const Connections = () => {
  const connections = useSelector((state) => state.connections.data);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    try {
      const response = await axios.get(API_BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(response.data.data));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "something went wrong";
      console.error(errorMessage);
      Swal.fire({
        icon: "error",
        text: errorMessage,
      });
    }
  };

  return (
    <div>
      <h2 className="text-4xl font-bold text-center my-4">Connections</h2>
      <div className="flex flex-col gap-5">
        {connections && connections.length > 0 ? (
          connections.map((connection) => (
            <div
              className="card card-side bg-base-300 shadow-sm h-35 w-1/2 mx-auto"
              key={connection._id}
            >
              <figure>
                <img src={connection.photoUrl} alt="Movie" />
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
          <div>No connections found</div>
        )}
      </div>
    </div>
  );
};

export default Connections;
