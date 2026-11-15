import React from "react";
import { Link } from "react-router-dom";

export default function Servicepage() {
  return (
    <div className="container py-3">
      <div className="text-center mb-4">
        <span className="badge bg-primary px-3 py-2 fs-6 rounded-pill mb-2">
          Circulation Rules & Facilities
        </span>
        <h2 className="fw-bold">Library Regulations & Member Facilities</h2>
        <p className="text-muted col-md-8 mx-auto small">
          Guidelines and operating standards to ensure smooth resource circulation and a focused learning environment.
        </p>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 shadow-sm border-0 text-center p-4 rounded-3 book-card bg-white">
            <div className="mb-2">
              <i className="fa-solid fa-book-bookmark text-primary fs-2"></i>
            </div>
            <h5 className="fw-bold">14-Day Borrowing</h5>
            <p className="text-muted small">
              Students may borrow up to 3 books for 14 calendar days with 1 online renewal option.
            </p>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card h-100 shadow-sm border-0 text-center p-4 rounded-3 book-card bg-white">
            <div className="mb-2">
              <i className="fa-solid fa-laptop text-info fs-2"></i>
            </div>
            <h5 className="fw-bold">Digital E-Library</h5>
            <p className="text-muted small">
              High-speed Wi-Fi workstations with access to IEEE, JSTOR, and Springer research papers.
            </p>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card h-100 shadow-sm border-0 text-center p-4 rounded-3 book-card bg-white">
            <div className="mb-2">
              <i className="fa-solid fa-volume-xmark text-secondary fs-2"></i>
            </div>
            <h5 className="fw-bold">Quiet Study Wings</h5>
            <p className="text-muted small">
              Silent reading chambers and reserved study cubicles for competitive exam prep.
            </p>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card h-100 shadow-sm border-0 text-center p-4 rounded-3 book-card bg-white">
            <div className="mb-2">
              <i className="fa-solid fa-arrows-rotate text-warning fs-2"></i>
            </div>
            <h5 className="fw-bold">Book Reservations</h5>
            <p className="text-muted small">
              Hold copies currently in circulation and receive automated alert upon return.
            </p>
          </div>
        </div>
      </div>

      {/* Timings Schedule & Admin Callout */}
      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card shadow-sm border-0 rounded-3 p-4 bg-white h-100">
            <h5 className="fw-bold mb-3 d-flex align-items-center">
              <i className="fa-solid fa-clock text-primary me-2"></i> Library Operating Hours
            </h5>

            <ul className="list-group list-group-flush small">
              <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                <span>Monday – Friday (Working Days)</span>
                <span className="badge bg-primary">8:00 AM – 9:00 PM</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                <span>Saturday (Reading Hall Only)</span>
                <span className="badge bg-secondary">9:00 AM – 5:00 PM</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                <span>Sunday & Public Holidays</span>
                <span className="badge bg-light text-dark border">Closed for Cataloging</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                <span>Exam Season Extended Hours</span>
                <span className="badge bg-success">Open Until Midnight (12:00 AM)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card shadow-sm border-0 bg-dark text-white rounded-3 p-4 h-100 d-flex flex-column justify-content-between">
            <div>
              <h5 className="fw-bold mb-2">Admin Circulation Desk</h5>
              <p className="text-white-50 small mb-3">
                Quick actions for the librarian on duty: manage books catalog or issue new member cards.
              </p>
            </div>
            <div className="d-flex gap-2 flex-wrap">
              <Link to="/landing/products" className="btn btn-primary btn-sm fw-semibold">
                Manage Books (CRUD)
              </Link>
              <Link to="/landing/userlist" className="btn btn-outline-light btn-sm fw-semibold">
                Manage Members
              </Link>
              <Link to="/landing/db" className="btn btn-light btn-sm fw-semibold">
                View Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

