import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { API_BASE_URL } from "../utils/constants";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
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
        error instanceof Error ? error.message : "something went wrong";
      setErrorMessage(errorDetails);
      console.error(errorDetails);
    }
  };

  return (
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
              })}
            />
          </fieldset>
          {errors.email && (
            <p className="text-red-600">{errors.email.message}</p>
          )}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="password"
              className="input"
              placeholder="Password"
              {...register("password", {
                required: "password is required",
              })}
            />
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
                <span id="spinner" class="inset-0">
                  <svg
                    class="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                </span>
              )}
              {loading ? "Signing in…" : " Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
