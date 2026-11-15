import axios from "axios";
import React, { useEffect, useState } from "react";
import API_URL from "../../../config";

export default function Userlist() {
  const [userlist, updateusers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Add Member Form State (CREATE)
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    memberType: "Student",
  });

  // Edit Member State (UPDATE)
  const [editId, setEditId] = useState(null);
  const [editUser, setEditUser] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    memberType: "Student",
  });

  // 1. READ: Fetch all members
  const myapi = () => {
    axios
      .get(`${API_URL}/alldata`)
      .then((d) => {
        updateusers(d.data.data || []);
      })
      .catch((err) => {
        console.log("Error fetching members:", err);
      });
  };

  useEffect(() => {
    myapi();
  }, []);

  // 2. CREATE: Add new member
  const handleAddSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/registor`, newUser)
      .then((res) => {
        alert(res.data.msg || "Member registered successfully!");
        setNewUser({
          name: "",
          phone: "",
          email: "",
          password: "",
          memberType: "Student",
        });
        setShowAddForm(false);
        myapi();
      })
      .catch((err) => {
        console.log("Error adding member:", err);
        alert("Failed to add member. Please check if the backend server is running.");
      });
  };

  // 3. UPDATE: Start editing a member
  const startEdit = (user) => {
    setEditId(user._id);
    setEditUser({
      name: user.name,
      phone: user.phone || "",
      email: user.email,
      password: user.password || "",
      memberType: user.memberType || "Student",
    });
    setShowAddForm(false);
  };

  // 3. UPDATE: Save edited member
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${API_URL}/updateuser/${editId}`, editUser)
      .then((res) => {
        alert(res.data.msg || "Member updated successfully!");
        setEditId(null);
        myapi();
      })
      .catch((err) => {
        console.log("Error updating member:", err);
        alert("Failed to update member.");
      });
  };

  // 4. DELETE: Delete a member
  const userdelete = (id, name) => {
    if (window.confirm(`Are you sure you want to remove member "${name || "this user"}"?`)) {
      axios
        .delete(`${API_URL}/userdelete/${id}`)
        .then((res) => {
          alert(res.data.msg || "Member removed successfully");
          myapi();
        })
        .catch((err) => {
          console.log("Error deleting member:", err);
          alert("Failed to delete member.");
        });
    }
  };

  // Filter members based on search
  const filteredUsers = userlist.filter(
    (u) =>
      (u.name && u.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.email && u.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.membershipId && u.membershipId.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container-fluid p-3">
      {/* Top Header & Actions */}
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <div>
          <h3 className="m-0 fw-bold">
            <i className="fa-solid fa-users text-primary me-2"></i>
            Library Members Management
          </h3>
          <p className="text-muted small m-0">
            Admin console: Register students & staff, view membership cards, and manage library accounts.
          </p>
        </div>
        <div className="d-flex gap-2">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Search name, email, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: "230px" }}
          />
          <button
            className={`btn btn-sm ${showAddForm ? "btn-secondary" : "btn-primary fw-semibold"}`}
            onClick={() => {
              setShowAddForm(!showAddForm);
              setEditId(null);
            }}
          >
            {showAddForm ? (
              <>
                <i className="fa-solid fa-xmark me-1"></i> Close Form
              </>
            ) : (
              <>
                <i className="fa-solid fa-plus me-1"></i> Register New Member
              </>
            )}
          </button>
        </div>
      </div>

      {/* CREATE FORM CARD */}
      {showAddForm && (
        <div className="card mb-4 shadow-sm border-primary">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h5 className="card-title m-0">
              <i className="fa-solid fa-user-plus me-2"></i> Register New Library Member
            </h5>
            <small>Librarian Admin</small>
          </div>
          <div className="card-body">
            <form onSubmit={handleAddSubmit}>
              <div className="row g-3">
                <div className="col-md-3">
                  <label className="form-label fw-semibold">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Full Name"
                    required
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Phone"
                    required
                    value={newUser.phone}
                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Email"
                    required
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold">Member Role</label>
                  <select
                    className="form-select"
                    value={newUser.memberType}
                    onChange={(e) => setNewUser({ ...newUser, memberType: e.target.value })}
                  >
                    <option value="Student">Student</option>
                    <option value="Faculty">Faculty</option>
                    <option value="Scholar">Research Scholar</option>
                    <option value="General Member">General Reader</option>
                  </select>
                </div>
              </div>
              <div className="mt-3">
                <button type="submit" className="btn btn-success me-2 fw-semibold">
                  <i className="fa-solid fa-floppy-disk me-1"></i> Save Member
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* UPDATE FORM CARD */}
      {editId && (
        <div className="card mb-4 shadow-sm border-warning">
          <div className="card-header bg-warning text-dark d-flex justify-content-between align-items-center">
            <h5 className="card-title m-0">
              <i className="fa-solid fa-user-pen me-2"></i> Edit Member (ID: {editId})
            </h5>
            <small>Admin Edit</small>
          </div>
          <div className="card-body">
            <form onSubmit={handleUpdateSubmit}>
              <div className="row g-3">
                <div className="col-md-3">
                  <label className="form-label fw-semibold">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={editUser.name}
                    onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={editUser.phone}
                    onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    required
                    value={editUser.email}
                    onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold">Member Role</label>
                  <select
                    className="form-select"
                    value={editUser.memberType}
                    onChange={(e) => setEditUser({ ...editUser, memberType: e.target.value })}
                  >
                    <option value="Student">Student</option>
                    <option value="Faculty">Faculty</option>
                    <option value="Scholar">Research Scholar</option>
                    <option value="General Member">General Reader</option>
                  </select>
                </div>
              </div>
              <div className="mt-3">
                <button type="submit" className="btn btn-warning me-2 fw-semibold">
                  <i className="fa-solid fa-check me-1"></i> Update Member
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setEditId(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* READ: MEMBER TABLE */}
      <div className="card shadow-sm border-0 rounded-3 overflow-hidden">
        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center py-2">
          <span className="fw-bold">Active Members Directory ({filteredUsers.length})</span>
          <small className="text-white-50">Issued library passes</small>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered table-hover table-striped m-0 align-middle">
            <thead className="table-light">
              <tr>
                <th>Membership ID</th>
                <th>Member Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Type</th>
                <th>Status</th>
                <th className="text-center" style={{ width: "160px" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-muted">
                    No members found. Click <strong>+ Register New Member</strong> to add one!
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u._id}>
                    <td>
                      <span className="badge bg-primary-subtle text-primary font-monospace border border-primary-subtle">
                        {u.membershipId || "LIB-" + u._id.slice(-4).toUpperCase()}
                      </span>
                    </td>
                    <td>
                      <strong>{u.name}</strong>
                    </td>
                    <td>{u.phone}</td>
                    <td>{u.email}</td>
                    <td>
                      <span className="badge bg-secondary-subtle text-secondary border">
                        {u.memberType || "Student"}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-available">Active</span>
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-warning btn-sm me-2 px-2"
                        title="Edit Member"
                        onClick={() => startEdit(u)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm px-2"
                        title="Delete Member"
                        onClick={() => userdelete(u._id, u.name)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}