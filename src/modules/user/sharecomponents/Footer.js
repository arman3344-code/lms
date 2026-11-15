import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="container-fluid b-gr text-light">
      <footer className="py-3">
        <ul className="nav justify-content-center border-bottom border-secondary pb-3 mb-3">
          <li className="nav-item">
            <Link to="/landing" className="nav-link px-3 text-light">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/landing/db" className="nav-link px-3 text-light">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/landing/products" className="nav-link px-3 text-light">
              Manage Books
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/landing/userlist" className="nav-link px-3 text-light">
              Manage Members
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/landing/features" className="nav-link px-3 text-light">
              Genres
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/landing/service" className="nav-link px-3 text-light">
              Rules & Timings
            </Link>
          </li>
        </ul>
        <p className="text-center text-white-50 mb-0 small">
          © 2026 Library Portal • Library Management System (Admin Portal)
        </p>
      </footer>
    </div>
  );
}

