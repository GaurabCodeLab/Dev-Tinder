import routes from "./routes";
import { useRoutes, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "./redux/slices/userSlice";
import { useEffect } from "react";
import { API_BASE_URL } from "./utils/constants";

const App = () => {
  const element = useRoutes(routes);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.userDetails.user);

  useEffect(() => {
    if (!userDetails) {
      fetchUser();
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(API_BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(response.data.user));
      navigate("/dashboard");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "something went wrong";
      console.error(errorMessage);
    }
  };

  return <div>{element}</div>;
};

export default App;
