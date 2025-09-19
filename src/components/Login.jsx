import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(response.data.data));
      navigate("/dashboard");
    } catch (error) {
      console.log("Error in login: " + (error.message || error.data.message));
    }
  };

  return (
    <div className="card card-border bg-base-200 w-96 mt-6">
      <div className="card-body">
        <h2 className="card-title text-2xl">Login</h2>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Email</legend>
          <input
            type="text"
            className="input"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Password</legend>
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>
        <div className="card-actions pt-4">
          <button className="btn btn-primary w-full" onClick={handleSubmit}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
