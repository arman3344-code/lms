import React from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className="container-fluid b-gr py-2 border-bottom border-dark">
      <div className="d-flex flex-wrap align-items-center justify-content-between">
        {/* Brand Logo */}
        <Link
          to="/landing"
          className="d-flex align-items-center text-white text-decoration-none me-lg-4 fs-4 fw-bold"
        >
          <div className="bg-primary rounded-3 p-2 me-2 d-flex align-items-center justify-content-center" style={{ width: "36px", height: "36px" }}>
            <i className="fa-solid fa-book-open text-white fs-5"></i>
          </div>
          <div>
            <span>Library Portal</span>
            <small className="d-block text-white-50 fw-normal" style={{ fontSize: "11px", marginTop: "-4px" }}>
              Library Management System
            </small>
          </div>
        </Link>

        {/* Navigation Links */}
        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li>
            <Link
              to="/landing"
              className={`nav-link px-3 text-white ${currentPath === "/landing" ? "fw-bold text-info" : ""}`}
            >
              <i className="fa-solid fa-house me-1"></i> Home
            </Link>
          </li>
          <li>
            <Link
              to="/landing/db"
              className={`nav-link px-3 text-white ${currentPath === "/landing/db" ? "fw-bold text-info" : ""}`}
            >
              <i className="fa-solid fa-chart-line me-1"></i> Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/landing/books"
              className={`nav-link px-3 text-white ${currentPath === "/landing/books" ? "fw-bold text-info" : ""}`}
            >
              <i className="fa-solid fa-book me-1"></i> Books (CRUD)
            </Link>
          </li>
          <li>
            <Link
              to="/landing/products"
              className={`nav-link px-3 text-white ${currentPath === "/landing/products" ? "fw-bold text-info" : ""}`}
            >
              <i className="fa-solid fa-layer-group me-1"></i> Catalog
            </Link>
          </li>
          <li>
            <Link
              to="/landing/userlist"
              className={`nav-link px-3 text-white ${currentPath === "/landing/userlist" ? "fw-bold text-info" : ""}`}
            >
              <i className="fa-solid fa-users me-1"></i> Members
            </Link>
          </li>
          <li>
            <Link
              to="/landing/features"
              className={`nav-link px-3 text-white ${currentPath === "/landing/features" ? "fw-bold text-info" : ""}`}
            >
              <i className="fa-solid fa-tags me-1"></i> Genres
            </Link>
          </li>
          <li>
            <Link
              to="/landing/service"
              className={`nav-link px-3 text-white ${currentPath === "/landing/service" ? "fw-bold text-info" : ""}`}
            >
              <i className="fa-solid fa-clock me-1"></i> Rules & Timings
            </Link>
          </li>
        </ul>

        {/* Auth Actions */}
        <div className="text-end">
          <Link to="/" className="btn btn-outline-light btn-sm me-2">
            <i className="fa-solid fa-right-to-bracket me-1"></i> Portal Login
          </Link>
          <Link to="/registor" className="btn btn-warning btn-sm fw-semibold">
            <i className="fa-solid fa-user-plus me-1"></i> New Member
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;


