import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="g-b h-100">
      <div className="d-flex flex-column flex-shrink-0">
        {/* Admin Branding */}
        <div className="d-flex align-items-center mb-2 text-white">
          <div className="bg-primary bg-gradient rounded-3 p-2 me-2 d-flex align-items-center justify-content-center" style={{ width: "38px", height: "38px" }}>
            <i className="fa-solid fa-shield-halved fs-5"></i>
          </div>
          <div>
            <span className="fs-6 fw-bold d-block">Library Admin</span>
            <span className="badge bg-success" style={{ fontSize: "10px" }}>Active Portal</span>
          </div>
        </div>

        <hr className="my-2 border-secondary" />

        {/* Admin Navigation */}
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <Link
              to="/landing/db"
              className={`nav-link text-white ${currentPath === "/landing/db" ? "bg-primary active fw-bold" : ""}`}
            >
              <i className="fa-solid fa-chart-line me-2"></i> Admin Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/landing/products"
              className={`nav-link text-white ${currentPath === "/landing/products" ? "bg-primary active fw-bold" : ""}`}
            >
              <i className="fa-solid fa-book me-2"></i> Manage Books (CRUD)
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/landing/userlist"
              className={`nav-link text-white ${currentPath === "/landing/userlist" ? "bg-primary active fw-bold" : ""}`}
            >
              <i className="fa-solid fa-users me-2"></i> Manage Members
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/landing/features"
              className={`nav-link text-white ${currentPath === "/landing/features" ? "bg-primary active fw-bold" : ""}`}
            >
              <i className="fa-solid fa-tags me-2"></i> Book Genres
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/landing/service"
              className={`nav-link text-white ${currentPath === "/landing/service" ? "bg-primary active fw-bold" : ""}`}
            >
              <i className="fa-solid fa-clock me-2"></i> Rules & Timings
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/landing"
              className={`nav-link text-white ${currentPath === "/landing" ? "bg-primary active fw-bold" : ""}`}
            >
              <i className="fa-solid fa-house me-2"></i> Portal Overview
            </Link>
          </li>
        </ul>

        <hr className="my-3 border-secondary" />

        <div className="p-1">
          <Link to="/" className="btn btn-outline-danger btn-sm w-100 fw-semibold">
            <i className="fa-solid fa-right-from-bracket me-2"></i> Sign Out
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;


