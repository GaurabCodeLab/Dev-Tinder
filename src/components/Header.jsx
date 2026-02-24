import { useSelector } from "react-redux";
import axios from "axios";
import { removeUser } from "../redux/slices/userSlice";
import { removeFeed } from "../redux/slices/feedSlice";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "../utils/constants";
import Swal from "sweetalert2";

const Header = () => {
  const userDetails = useSelector((state) => state.userDetails.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(API_BASE_URL + "/auth/logout", {
        withCredentials: true,
      });
      dispatch(removeUser());
      dispatch(removeFeed());
      navigate("/");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "something went wrong";
      console.error(errorMessage);
      Swal.fire({
        title: "Error In logout",
        icon: "error",
        text: errorMessage,
      });
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" to="/dashboard">
          DevTinder
        </Link>
      </div>
      <div className="flex gap-4">
        {userDetails && (
          <div className="self-center">Hello, {userDetails.firstName}</div>
        )}
        {userDetails && (
          <div className="flex gap-2">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                {" "}
                <div className="w-10 rounded-full">
                  <img
                    alt="user photo"
                    src={userDetails.photoUrl && userDetails.photoUrl}
                  />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link className="justify-between" to="/dashboard/profile">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <div onClick={handleLogout}>Logout</div>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
