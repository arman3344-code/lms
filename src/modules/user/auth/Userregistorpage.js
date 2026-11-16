import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import libraryBg from "../../../img/library_bg.jpg";
import API_URL from "../../../config";

function Userregistorpage() {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      memberType: "Student",
    },
  });

  const formSubmit = (formdata) => {
    setLoading(true);
    axios
      .post(`${API_URL}/registor`, formdata)
      .then((res) => {
        toast.success(res.data.msg || "Member registered successfully! Please login.", { theme: "dark" });
        setTimeout(() => {
          nav("/");
        }, 1500);
      })
      .catch((err) => {
        console.log("Registration error:", err);
        const errMsg = err.response?.data?.msg || "Registration failed. Please check inputs or server connection.";
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
          <div className="col-md-6 col-lg-5 col-sm-10 card shadow-lg border-0 rounded-4 p-4 login-transparent-card">
            <h3 className="text-center mb-2 fw-bold text-white d-flex align-items-center justify-content-center">
              <i className="fa-solid fa-user-plus me-2 text-warning"></i> Member Registration
            </h3>
            <p className="text-center text-white-50 small mb-3">
              Create your library account to borrow books and access digital catalogs.
            </p>
            <ToastContainer />

            <form onSubmit={handleSubmit(formSubmit)}>
              <div className="mb-2">
                <label className="form-label fw-semibold text-white small">Full Name</label>
                <input
                  className="form-control form-control-sm"
                  placeholder="Enter full name"
                  {...register("name", { required: "Full name is required" })}
                />
                {errors.name && <small className="text-danger">{errors.name.message}</small>}
              </div>

              <div className="mb-2">
                <label className="form-label fw-semibold text-white small">Phone Number</label>
                <input
                  type="tel"
                  className="form-control form-control-sm"
                  placeholder="Enter phone number"
                  {...register("phone", { required: "Phone number is required" })}
                />
                {errors.phone && <small className="text-danger">{errors.phone.message}</small>}
              </div>

              <div className="mb-2">
                <label className="form-label fw-semibold text-white small">Email Address</label>
                <input
                  type="email"
                  className="form-control form-control-sm"
                  placeholder="Enter email address"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Invalid email format",
                    },
                  })}
                />
                {errors.email && <small className="text-danger">{errors.email.message}</small>}
              </div>

              <div className="mb-2">
                <label className="form-label fw-semibold text-white small">Member Role</label>
                <select className="form-select form-select-sm" {...register("memberType")}>
                  <option value="Student">Student (Quotas: 3 books / 14 days)</option>
                  <option value="Faculty">Faculty Member (Quotas: 10 books / 90 days)</option>
                  <option value="Scholar">Research Scholar (Quotas: 6 books / 30 days)</option>
                  <option value="General Member">General Reader (Quotas: 2 books / 7 days)</option>
                </select>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <label className="form-label fw-semibold text-white small">Password</label>
                  <span className="badge bg-secondary" style={{ fontSize: "10px" }}>Max 8 characters</span>
                </div>
                <input
                  type="password"
                  maxLength={8}
                  className="form-control form-control-sm"
                  placeholder="Create password (max 8 characters)"
                  {...register("password", {
                    required: "Password is required",
                    maxLength: {
                      value: 8,
                      message: "Password cannot exceed 8 characters",
                    },
                  })}
                />
                {errors.password && <small className="text-danger">{errors.password.message}</small>}
              </div>

              <div className="d-flex justify-content-between align-items-center mt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-warning px-4 fw-semibold w-100 py-2 shadow-sm text-dark"
                >
                  {loading ? (
                    <span>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Registering...
                    </span>
                  ) : (
                    <span>
                      <i className="fa-solid fa-id-card me-2"></i> Register Library Account
                    </span>
                  )}
                </button>
              </div>

              <div className="text-center mt-3 pt-2 border-top border-secondary border-opacity-50">
                <Link to="/" className="text-decoration-none small text-white-50">
                  Already registered? <span className="text-warning fw-semibold">Login here</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Userregistorpage;
