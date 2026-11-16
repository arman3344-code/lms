import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import libraryBg from "../../../img/library_bg.jpg";
import API_URL from "../../../config";

function Userloginpage() {
  const [loading, setLoading] = useState(false);
  const mynav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // If already logged in, redirect to dashboard
  useEffect(() => {
    const existingUser = localStorage.getItem("user");
    if (existingUser) {
      mynav("/landing/db");
    }
  }, [mynav]);

  const Submit = (formdata) => {
    setLoading(true);
    axios
      .post(`${API_URL}/login`, {
        email: formdata.email,
        password: formdata.password,
      })
      .then((res) => {
        const userData = res.data.data;
        localStorage.setItem("user", JSON.stringify(userData));
        toast.success(`Welcome back, ${userData.name}!`, { theme: "dark", autoClose: 1500 });
        setTimeout(() => {
          mynav("/landing/db");
        }, 1200);
      })
      .catch((err) => {
        console.log("Login error:", err);
        const errMsg = err.response?.data?.msg || "Login failed. Please check your credentials or server connection.";
        toast.error(errMsg, { theme: "dark" });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="loginbg d-flex align-items-center justify-content-center min-vh-100 py-4 position-relative">
      {/* Background Library Image */}
      <img
        src={libraryBg}
        alt="Library Background"
        className="login-bg-media"
      />
      <div className="login-overlay"></div>

      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="row justify-content-center">
          <div className="col-md-5 col-sm-10 card shadow-lg border-0 rounded-4 p-4 login-transparent-card">
            <h3 className="text-center mb-3 fw-bold text-white d-flex align-items-center justify-content-center">
              <i className="fa-solid fa-book-open me-2 text-warning"></i> Library Portal
            </h3>
            <p className="text-center text-white-50 small mb-4">
              Enter your registered university email & password to access library services.
            </p>
            <ToastContainer />

            <form onSubmit={handleSubmit(Submit)}>
              <div className="mb-3">
                <label className="form-label fw-semibold text-white">Email Address</label>
                <div className="input-group">
                  <span className="input-group-text bg-dark border-secondary text-white-50">
                    <i className="fa-solid fa-envelope"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter registered email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Invalid email format",
                      },
                    })}
                  />
                </div>
                {errors.email && <small className="text-danger mt-1 d-block">{errors.email.message}</small>}
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <label className="form-label fw-semibold text-white">Password</label>
                  <small className="text-white-50" style={{ fontSize: "11px" }}>Max 8 chars</small>
                </div>
                <div className="input-group">
                  <span className="input-group-text bg-dark border-secondary text-white-50">
                    <i className="fa-solid fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    maxLength={8}
                    className="form-control"
                    placeholder="Enter password (max 8 characters)"
                    {...register("password", {
                      required: "Password is required",
                      maxLength: {
                        value: 8,
                        message: "Password cannot exceed 8 characters",
                      },
                    })}
                  />
                </div>
                {errors.password && <small className="text-danger mt-1 d-block">{errors.password.message}</small>}
              </div>

              <div className="d-flex justify-content-between align-items-center mt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary px-4 fw-semibold w-100 py-2 shadow-sm"
                >
                  {loading ? (
                    <span>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Authenticating...
                    </span>
                  ) : (
                    <span>
                      <i className="fa-solid fa-right-to-bracket me-2"></i> Login to Portal
                    </span>
                  )}
                </button>
              </div>

              <div className="text-center mt-3 pt-3 border-top border-secondary border-opacity-50">
                <Link to="/registor" className="text-decoration-none small text-white-50">
                  New student or faculty? <span className="text-warning fw-semibold">Register here</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Userloginpage;
