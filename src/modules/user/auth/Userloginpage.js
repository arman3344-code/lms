import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import libraryBg from "../../../img/library_bg.jpg";

function Userloginpage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const mynav = useNavigate();

  const Submit = (formdata) => {
    if (formdata.email && formdata.pass) {
      toast.success("Welcome to Library Portal!", { theme: "dark", autoClose: 1500 });
      setTimeout(() => {
        mynav("/landing/db");
      }, 1500);
    } else {
      toast.warning("Please enter valid email and password");
    }
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
            <h3 className="text-center mb-4 fw-bold text-white d-flex align-items-center justify-content-center">
              <i className="fa-solid fa-book-open me-2"></i> Library Portal
            </h3>
            <ToastContainer />
            <form onSubmit={handleSubmit(Submit)}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  {...register("email", { required: true })}
                />
                {errors.email && <small className="text-danger">Email is required</small>}
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  {...register("pass", { required: true })}
                />
                {errors.pass && <small className="text-danger">Password is required</small>}
              </div>

              <div className="d-flex justify-content-between align-items-center mt-4">
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-primary px-4 fw-semibold w-100"
                />
              </div>

              <div className="text-center mt-3 pt-3 border-top">
                <Link to="/registor" className="text-decoration-none small text-muted">
                  Register new library member? <span className="text-primary fw-semibold">Click here</span>
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
