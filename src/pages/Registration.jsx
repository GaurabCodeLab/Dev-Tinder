import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";

const Registration = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const { firstName, lastName, email, password, age, gender } = data;
      const response = await axios.post(
        API_BASE_URL + "/auth/signup",
        { firstName, lastName, email, password, age, gender },
        {
          withCredentials: true,
        },
      );
      setLoading(false);
      Swal.fire({
        icon: "success",
        text: response.data.message,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/");
        }
      });
    } catch (error) {
      setLoading(false);
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
      <div className="flex justify-center flex-col">
        <h2 className="card-title">Registration</h2>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">First Name</legend>
          <input
            type="text"
            maxLength={30}
            className="input"
            disabled={loading}
            placeholder="First Name"
            {...register("firstName", {
              required: "First Name is required",
              minLength: {
                value: 2,
                message: "First Name must be at least 2 characters",
              },
            })}
          />
          {errors.firstName && (
            <p className="text-red-600">{errors.firstName.message}</p>
          )}
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Last Name</legend>
          <input
            type="text"
            className="input"
            placeholder="Last Name"
            maxLength={30}
            disabled={loading}
            {...register("lastName", {})}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Email</legend>
          <input
            type="text"
            className="input"
            placeholder="Email"
            disabled={loading}
            {...register("email", {
              required: "email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
                message: "provide correct email",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-600">{errors.email.message}</p>
          )}
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Password</legend>
          <input
            type="password"
            className="input"
            placeholder="Password"
            disabled={loading}
            {...register("password", {
              required: "password is required",
              pattern: {
                value:
                  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
                message:
                  "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-600">{errors.password.message}</p>
          )}
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Confirm Password</legend>
          <input
            type="password"
            className="input"
            placeholder="Confirm Password"
            disabled={loading}
            {...register("confirmPassword", {
              required: "confirm password is required",
              validate: (value) =>
                watch("password") === value ||
                "password & confirm password must match",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-600">{errors.confirmPassword.message}</p>
          )}
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Age</legend>
          <input
            type="text"
            className="input"
            placeholder="Age"
            maxLength={2}
            disabled={loading}
            {...register("age", {
              required: "Age is required",
              onChange: (e) => {
                setValue("age", e.target.value.replace(/[^0-9]/g, ""));
              },
              validate: (value) =>
                Number(value) >= 18 || "age must be at least 18 years old",
            })}
          />
          {errors.age && <p className="text-red-600">{errors.age.message}</p>}
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Gender</legend>
          <select
            defaultValue="Pick a browser"
            className="select"
            {...register("gender", {
              required: "Gender is required",
            })}
            disabled={loading}
          >
            <option value="">Select a Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && (
            <p className="text-red-600">{errors.gender.message}</p>
          )}
        </fieldset>
        <div className="card-actions justify-center">
          <button
            className="btn btn-primary"
            onClick={handleSubmit(onSubmit)}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </div>
      <p className="text-center font-bold mt-2">
        Already a User{" "}
        <Link to="/" className="text-green-600 underline">
          Login Now
        </Link>
      </p>
    </div>
  );
};

export default Registration;
