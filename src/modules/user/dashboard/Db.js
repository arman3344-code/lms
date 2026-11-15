import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:8900";

function Db() {
  const [stats, setStats] = useState({
    totalUniqueTitles: 0,
    totalBooksCopies: 0,
    availableCopies: 0,
    issuedCopies: 0,
    totalMembers: 0,
    genreDistribution: {},
    recentBooks: [],
    recentMembers: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = () => {
    // Try custom /stats endpoint first
    axios
      .get(`${API_URL}/stats`)
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Stats API fallback to direct collections:", err);
        // Fallback: fetch books & users directly
        Promise.all([
          axios.get(`${API_URL}/books`).catch(() => ({ data: { data: [] } })),
          axios.get(`${API_URL}/alldata`).catch(() => ({ data: { data: [] } })),
        ]).then(([booksRes, usersRes]) => {
          const books = booksRes.data.data || [];
          const members = usersRes.data.data || [];

          let totalCopies = 0;
          let availCopies = 0;
          const genreMap = {};

          books.forEach((b) => {
            const c = Number(b.copies) || 1;
            const a = b.availableCopies !== undefined ? Number(b.availableCopies) : 1;
            totalCopies += c;
            availCopies += a;
            const g = b.genre || "General";
            genreMap[g] = (genreMap[g] || 0) + 1;
          });

          setStats({
            totalUniqueTitles: books.length,
            totalBooksCopies: totalCopies,
            availableCopies: availCopies,
            issuedCopies: Math.max(0, totalCopies - availCopies),
            totalMembers: members.length,
            genreDistribution: genreMap,
            recentBooks: books.slice(-5).reverse(),
            recentMembers: members.slice(-5).reverse(),
          });
          setLoading(false);
        });
      });
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="container-fluid p-3">
      {/* Title & Quick Actions */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <div className="d-flex align-items-center gap-2">
            <h2 className="fw-bold mb-0">Library Admin Dashboard</h2>
            <span className="badge bg-primary">Admin Overview</span>
          </div>
          <p className="text-muted m-0 small mt-1">
            Real-time library metrics, physical catalog inventory, active book borrowings, and member records.
          </p>
        </div>
        <div className="d-flex gap-2">
          <Link to="/landing/products" className="btn btn-primary btn-sm fw-semibold">
            + Manage Books
          </Link>
          <Link to="/landing/userlist" className="btn btn-outline-dark btn-sm fw-semibold">
            + Register Member
          </Link>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="row g-3 mb-4">
        {/* Card 1: Total Book Titles */}
        <div className="col-sm-6 col-lg-3">
          <div
            className="card shadow-sm border-0 h-100 rounded-3 metric-card"
            style={{ borderLeft: "4px solid #2563eb" }}
          >
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <span className="text-muted text-uppercase fw-semibold small">Total Titles</span>
                <i className="fa-solid fa-book text-primary fs-4"></i>
              </div>
              <h3 className="fw-bold text-primary mt-2 mb-1">{stats.totalUniqueTitles}</h3>
              <small className="text-muted">
                {stats.totalBooksCopies} total physical copies
              </small>
            </div>
          </div>
        </div>

        {/* Card 2: Available in Stock */}
        <div className="col-sm-6 col-lg-3">
          <div
            className="card shadow-sm border-0 h-100 rounded-3 metric-card"
            style={{ borderLeft: "4px solid #16a34a" }}
          >
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <span className="text-muted text-uppercase fw-semibold small">Available Copies</span>
                <i className="fa-solid fa-circle-check text-success fs-4"></i>
              </div>
              <h3 className="fw-bold text-success mt-2 mb-1">{stats.availableCopies}</h3>
              <small className="text-success fw-semibold">Ready on shelves to issue</small>
            </div>
          </div>
        </div>

        {/* Card 3: Issued / Borrowed */}
        <div className="col-sm-6 col-lg-3">
          <div
            className="card shadow-sm border-0 h-100 rounded-3 metric-card"
            style={{ borderLeft: "4px solid #ea580c" }}
          >
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <span className="text-muted text-uppercase fw-semibold small">Currently Issued</span>
                <i className="fa-solid fa-arrows-rotate text-warning fs-4"></i>
              </div>
              <h3 className="fw-bold text-warning mt-2 mb-1">{stats.issuedCopies}</h3>
              <small className="text-muted">Circulating with members</small>
            </div>
          </div>
        </div>

        {/* Card 4: Registered Members */}
        <div className="col-sm-6 col-lg-3">
          <div
            className="card shadow-sm border-0 h-100 rounded-3 metric-card"
            style={{ borderLeft: "4px solid #7c3aed" }}
          >
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <span className="text-muted text-uppercase fw-semibold small">Active Members</span>
                <i className="fa-solid fa-graduation-cap text-info fs-4"></i>
              </div>
              <h3 className="fw-bold text-info mt-2 mb-1">{stats.totalMembers}</h3>
              <small className="text-success fw-semibold">Students & Faculty</small>
            </div>
          </div>
        </div>
      </div>

      {/* Main Section: Recent Books in Catalog & Genre Distribution */}
      <div className="row g-4 mb-4">
        {/* Recent Books in Catalog */}
        <div className="col-lg-8">
          <div className="card shadow-sm border-0 rounded-3 h-100">
            <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
              <h5 className="m-0 fw-bold">
                <i className="fa-solid fa-clock-rotate-left text-primary me-2"></i>
                Recent Books in Library
              </h5>
              <Link to="/landing/products" className="btn btn-sm btn-link text-decoration-none">
                View All Books &rarr;
              </Link>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Genre</th>
                      <th>Shelf</th>
                      <th>Available</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentBooks.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center py-4 text-muted">
                          No books found in library yet.{" "}
                          <Link to="/landing/products">Add first book</Link>
                        </td>
                      </tr>
                    ) : (
                      stats.recentBooks.map((b) => (
                        <tr key={b._id}>
                          <td className="fw-bold text-dark">{b.title}</td>
                          <td>{b.author}</td>
                          <td>
                            <span className="badge bg-secondary-subtle text-secondary border">
                              {b.genre}
                            </span>
                          </td>
                          <td>
                            <small className="text-muted font-monospace">{b.shelf || "Rack A-1"}</small>
                          </td>
                          <td>
                            <span className="badge badge-available">
                              {b.availableCopies} of {b.copies}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Library Genre Breakdown */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 rounded-3 h-100">
            <div className="card-header bg-white py-3">
              <h5 className="m-0 fw-bold">
                <i className="fa-solid fa-tags text-primary me-2"></i>
                Books By Genre
              </h5>
            </div>
            <div className="card-body">
              {Object.keys(stats.genreDistribution).length === 0 ? (
                <p className="text-muted small">No genre data available</p>
              ) : (
                Object.entries(stats.genreDistribution).map(([genreName, count]) => {
                  const pct = Math.round((count / Math.max(stats.totalUniqueTitles, 1)) * 100);
                  return (
                    <div className="mb-3" key={genreName}>
                      <div className="d-flex justify-content-between small fw-semibold mb-1">
                        <span>{genreName}</span>
                        <span>
                          {count} books ({pct}%)
                        </span>
                      </div>
                      <div className="progress" style={{ height: "7px" }}>
                        <div
                          className="progress-bar bg-primary"
                          style={{ width: `${Math.min(pct, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })
              )}

              <hr />
              <div className="text-center mt-3">
                <Link to="/landing/features" className="btn btn-outline-primary btn-sm w-100">
                  Explore All Genres & Sections
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Members Section */}
      <div className="card shadow-sm border-0 rounded-3">
        <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
          <h5 className="m-0 fw-bold">
            <i className="fa-solid fa-graduation-cap text-primary me-2"></i>
            Recent Registered Members
          </h5>
          <Link to="/landing/userlist" className="btn btn-sm btn-link text-decoration-none">
            Manage All Members &rarr;
          </Link>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Membership ID</th>
                  <th>Full Name</th>
                  <th>Role</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentMembers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-muted">
                      No members registered yet.{" "}
                      <Link to="/landing/userlist">Register a member</Link>
                    </td>
                  </tr>
                ) : (
                  stats.recentMembers.map((m) => (
                    <tr key={m._id}>
                      <td>
                        <span className="badge bg-primary-subtle text-primary font-monospace">
                          {m.membershipId || "LIB-" + m._id.slice(-4).toUpperCase()}
                        </span>
                      </td>
                      <td className="fw-bold">{m.name}</td>
                      <td>
                        <span className="badge bg-light text-dark border">
                          {m.memberType || "Student"}
                        </span>
                      </td>
                      <td>{m.email}</td>
                      <td>{m.phone}</td>
                      <td>
                        <span className="badge badge-available">Active</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Db;

