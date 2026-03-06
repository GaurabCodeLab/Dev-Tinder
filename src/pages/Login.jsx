import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/slices/userSlice";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useState } from "react";
import { API_BASE_URL } from "../utils/constants";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState("hide");
  const userDetails = useSelector((state) => state.userDetails.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(API_BASE_URL + "/auth/login", data, {
        withCredentials: true,
      });
      setLoading(false);
      dispatch(addUser(response.data.data));
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      const errorDetails =
        error?.response?.data?.message || "something went wrong";
      setErrorMessage(errorDetails);
      console.error(errorDetails);
    }
  };

  return userDetails ? (
    <Navigate to="/dashboard" />
  ) : (
    <div className="flex justify-center mt-10">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email Address</legend>
            <input
              type="text"
              className="input"
              placeholder="Email"
              {...register("email", {
                required: " Email is required",
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: "provide correct email address",
                },
                onChange: () => {
                  setErrorMessage("");
                },
              })}
            />
          </fieldset>
          {errors.email && (
            <p className="text-red-600">{errors.email.message}</p>
          )}
          <fieldset className="fieldset relative">
            <legend className="fieldset-legend">Password</legend>
            <input
              type={toggle === "hide" ? "password" : "text"}
              className="input"
              placeholder="Password"
              {...register("password", {
                required: "password is required",
                onChange: () => {
                  setErrorMessage("");
                },
              })}
            />
            {toggle === "hide" ? (
              <FaRegEyeSlash
                className="text-xl absolute right-5 cursor-pointer top-3"
                onClick={() => setToggle("show")}
              />
            ) : (
              <FaRegEye
                className="text-xl absolute right-5 cursor-pointer top-3"
                onClick={() => setToggle("hide")}
              />
            )}
          </fieldset>
          {errors.password && (
            <p className="text-red-600">{errors.password.message}</p>
          )}
          {errorMessage && <p className="text-red-600">{errorMessage}</p>}
          <div className="card-actions justify-center mt-4">
            <button
              className="btn btn-primary"
              onClick={handleSubmit(onSubmit)}
              disabled={loading}
            >
              {loading && (
                <span id="spinner" className="inset-0">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                </span>
              )}
              {loading ? "Signing in…" : " Login"}
            </button>
          </div>
          <p className="text-center font-bold mt-2">
            Not a User{" "}
            <Link to="/registration" className="text-green-600 underline">
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
