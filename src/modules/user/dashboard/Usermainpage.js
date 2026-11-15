import React from "react";
import { Link } from "react-router-dom";

function Usermainpage() {
  return (
    <div className="container-fluid py-3 px-md-3">
      {/* Hero Welcome Banner */}
      <div className="card shadow-sm border-0 rounded-4 overflow-hidden mb-4 bg-dark text-white p-4 p-md-5">
        <div className="row align-items-center gy-4">
          <div className="col-lg-8">
            <span className="badge bg-primary px-3 py-2 fs-6 rounded-pill mb-3">
              <i className="fa-solid fa-book-open me-2"></i> Library Portal • Admin Console
            </span>
            <h1 className="display-5 fw-bold mb-3">
              Library Management & Circulation System
            </h1>
            <p className="lead text-white-50 mb-4" style={{ maxWidth: "680px" }}>
              Streamlined administration portal for cataloging book inventory, monitoring real-time book borrowing/returns, managing student and faculty memberships, and organizing library wings.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <Link to="/landing/products" className="btn btn-primary btn-lg px-4 shadow-sm fw-semibold">
                <i className="fa-solid fa-book me-2"></i> Manage Books (CRUD)
              </Link>
              <Link to="/landing/userlist" className="btn btn-warning btn-lg px-4 shadow-sm fw-semibold text-dark">
                <i className="fa-solid fa-users me-2"></i> Manage Members
              </Link>
              <Link to="/landing/db" className="btn btn-outline-light btn-lg px-4">
                <i className="fa-solid fa-chart-line me-2"></i> View Live Dashboard
              </Link>
            </div>
          </div>
          <div className="col-lg-4 text-center">
            <div className="p-4 bg-white bg-opacity-10 rounded-4 border border-light border-opacity-25">
              <div className="mb-2">
                <i className="fa-solid fa-building-columns text-info fs-1"></i>
              </div>
              <h5 className="fw-bold mb-1">Central University Library</h5>
              <p className="text-white-50 small m-0">Open Today: 8:00 AM – 9:00 PM</p>
              <hr className="my-3 border-light border-opacity-25" />
              <div className="d-flex justify-content-around text-start small">
                <div>
                  <div className="text-white-50">Circulation</div>
                  <div className="fw-bold text-success">
                    <i className="fa-solid fa-circle-check me-1"></i> Normal
                  </div>
                </div>
                <div>
                  <div className="text-white-50">Database</div>
                  <div className="fw-bold text-info">
                    <i className="fa-solid fa-database me-1"></i> Connected
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Feature Action Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-3 col-sm-6">
          <div className="card border-0 shadow-sm rounded-3 p-3 text-center h-100 bg-white book-card">
            <div className="mb-2">
              <i className="fa-solid fa-book-bookmark text-primary fs-2"></i>
            </div>
            <h6 className="fw-bold mb-1">Book Inventory</h6>
            <p className="text-muted small mb-3">Add, edit, and organize titles with ISBN and shelf locations.</p>
            <Link to="/landing/products" className="btn btn-outline-primary btn-sm mt-auto">
              Open Books CRUD &rarr;
            </Link>
          </div>
        </div>

        <div className="col-md-3 col-sm-6">
          <div className="card border-0 shadow-sm rounded-3 p-3 text-center h-100 bg-white book-card">
            <div className="mb-2">
              <i className="fa-solid fa-arrows-rotate text-success fs-2"></i>
            </div>
            <h6 className="fw-bold mb-1">Fast Issue / Return</h6>
            <p className="text-muted small mb-3">1-click circulation controls for lending and returning book copies.</p>
            <Link to="/landing/products" className="btn btn-outline-success btn-sm mt-auto">
              Circulation Desk &rarr;
            </Link>
          </div>
        </div>

        <div className="col-md-3 col-sm-6">
          <div className="card border-0 shadow-sm rounded-3 p-3 text-center h-100 bg-white book-card">
            <div className="mb-2">
              <i className="fa-solid fa-graduation-cap text-warning fs-2"></i>
            </div>
            <h6 className="fw-bold mb-1">Member Registry</h6>
            <p className="text-muted small mb-3">Maintain student, faculty, and scholar library memberships.</p>
            <Link to="/landing/userlist" className="btn btn-outline-warning btn-sm mt-auto text-dark">
              Manage Members &rarr;
            </Link>
          </div>
        </div>

        <div className="col-md-3 col-sm-6">
          <div className="card border-0 shadow-sm rounded-3 p-3 text-center h-100 bg-white book-card">
            <div className="mb-2">
              <i className="fa-solid fa-chart-pie text-info fs-2"></i>
            </div>
            <h6 className="fw-bold mb-1">Analytics & Stats</h6>
            <p className="text-muted small mb-3">Live tracking of stock availability and genre distribution.</p>
            <Link to="/landing/db" className="btn btn-outline-info btn-sm mt-auto text-dark">
              View Stats &rarr;
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Usermainpage;