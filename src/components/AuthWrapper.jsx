import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthWrapper = ({ children }) => {
  const userDetails = useSelector((state) => state.userDetails.user);
  if (userDetails) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default AuthWrapper;
