import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import libraryBg from "../../../img/library_bg.jpg";
import API_URL from "../../../config";

function Userregistorpage() {
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
    axios
      .post(`${API_URL}/registor`, formdata)
      .then((res) => {
        toast.success(res.data.msg || "Member registered successfully!");
        setTimeout(() => {
          nav("/");
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          toast.error(err.response.data.msg || "Registration failed");
        } else {
          toast.error("Server not responding");
        }
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
            <h3 className="text-center mb-4 fw-bold text-white">Library Member Registration</h3>
            <ToastContainer />
            <form onSubmit={handleSubmit(formSubmit)}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Full Name</label>
                <input
                  className="form-control"
                  placeholder="Enter full name"
                  {...register("name", { required: true })}
                />
                {errors.name && <small className="text-danger">Name is required</small>}
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Phone Number</label>
                <input
                  className="form-control"
                  placeholder="Enter phone number"
                  {...register("phone", { required: true })}
                />
                {errors.phone && <small className="text-danger">Phone is required</small>}
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email address"
                  {...register("email", { required: true })}
                />
                {errors.email && <small className="text-danger">Email is required</small>}
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Member Role</label>
                <select className="form-select" {...register("memberType")}>
                  <option value="Student">Student</option>
                  <option value="Faculty">Faculty Member</option>
                  <option value="Scholar">Research Scholar</option>
                  <option value="General Member">General Reader</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Create password"
                  {...register("password", { required: true })}
                />
                {errors.password && <small className="text-danger">Password is required</small>}
              </div>

              <div className="d-flex justify-content-between align-items-center mt-4">
                <input
                  type="submit"
                  value="Register Member"
                  className="btn btn-primary px-4 fw-semibold w-100"
                />
              </div>

              <div className="text-center mt-3 pt-3 border-top">
                <Link to="/" className="text-decoration-none small text-muted">
                  Already have an account? <span className="text-primary fw-semibold">Login here</span>
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