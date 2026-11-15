import axios from "axios";
import React, { useEffect, useState } from "react";
import API_URL from "../../../config";

function Product() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");

  // Add Book Form State (CREATE)
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    genre: "Computer Science",
    isbn: "",
    copies: 1,
    shelf: "Rack A-1",
    description: "",
  });

  // Edit Book Form State (UPDATE)
  const [editId, setEditId] = useState(null);
  const [editBook, setEditBook] = useState({
    title: "",
    author: "",
    genre: "Computer Science",
    isbn: "",
    copies: 1,
    shelf: "Rack A-1",
    description: "",
  });

  // 1. READ: Fetch all books
  const fetchBooks = () => {
    axios
      .get(`${API_URL}/books`)
      .then((res) => {
        setBooks(res.data.data || []);
      })
      .catch((err) => {
        console.log("Error fetching books:", err);
      });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // 2. CREATE: Add new book
  const handleAddSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/books`, newBook)
      .then((res) => {
        alert(res.data.msg || "Book added to library successfully!");
        setNewBook({
          title: "",
          author: "",
          genre: "Computer Science",
          isbn: "",
          copies: 1,
          shelf: "Rack A-1",
          description: "",
        });
        setShowAddForm(false);
        fetchBooks();
      })
      .catch((err) => {
        console.log("Error adding book:", err);
        alert("Failed to add book. Make sure backend is running.");
      });
  };

  // 3. UPDATE: Start editing
  const startEdit = (b) => {
    setEditId(b._id);
    setEditBook({
      title: b.title,
      author: b.author,
      genre: b.genre || "General",
      isbn: b.isbn,
      copies: b.copies || 1,
      shelf: b.shelf || "Rack A-1",
      description: b.description || "",
    });
    setShowAddForm(false);
  };

  // 3. UPDATE: Save edited book
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${API_URL}/books/${editId}`, editBook)
      .then((res) => {
        alert(res.data.msg || "Book updated successfully!");
        setEditId(null);
        fetchBooks();
      })
      .catch((err) => {
        console.log("Error updating book:", err);
        alert("Failed to update book.");
      });
  };

  // 4. DELETE: Remove book
  const deleteBook = (id, title) => {
    if (window.confirm(`Are you sure you want to remove "${title}" from the library?`)) {
      axios
        .delete(`${API_URL}/books/${id}`)
        .then((res) => {
          alert(res.data.msg || "Book deleted successfully!");
          fetchBooks();
        })
        .catch((err) => {
          console.log("Error deleting book:", err);
          alert("Failed to delete book.");
        });
    }
  };

  // 5. CIRCULATION: Issue a copy
  const handleIssue = (id, title) => {
    axios
      .patch(`${API_URL}/books/${id}/issue`)
      .then((res) => {
        alert(res.data.msg || `Issued "${title}"!`);
        fetchBooks();
      })
      .catch((err) => {
        alert(err.response?.data?.msg || "Failed to issue book.");
      });
  };

  // 6. CIRCULATION: Return a copy
  const handleReturn = (id, title) => {
    axios
      .patch(`${API_URL}/books/${id}/return`)
      .then((res) => {
        alert(res.data.msg || `Returned "${title}"!`);
        fetchBooks();
      })
      .catch((err) => {
        alert(err.response?.data?.msg || "Failed to return book.");
      });
  };

  // Filter books based on search & genre
  const filteredBooks = books.filter((b) => {
    const matchesSearch =
      (b.title && b.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (b.author && b.author.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (b.isbn && b.isbn.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesGenre = selectedGenre === "all" || b.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const genres = [
    "all",
    "Computer Science",
    "Fiction & Literature",
    "Science & Mathematics",
    "History & Philosophy",
    "Business & Economics",
    "Self-Improvement",
  ];

  return (
    <div className="container-fluid p-3">
      {/* Top Header & Actions */}
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <div>
          <h3 className="m-0 fw-bold">
            <i className="fa-solid fa-book-bookmark text-primary me-2"></i>
            Book Inventory & Circulation (CRUD)
          </h3>
          <p className="text-muted small m-0">
            Admin console: Manage book titles, physical copies, shelf placement, and quick issue/return.
          </p>
        </div>
        <div className="d-flex gap-2 align-items-center flex-wrap">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Search title, author, ISBN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: "220px" }}
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
                <i className="fa-solid fa-plus me-1"></i> Add New Book
              </>
            )}
          </button>
        </div>
      </div>

      {/* Genre Filter Pills */}
      <div className="d-flex gap-1 mb-3 overflow-auto pb-1">
        {genres.map((g) => (
          <button
            key={g}
            className={`btn btn-sm text-capitalize ${
              selectedGenre === g ? "btn-dark fw-bold" : "btn-outline-secondary"
            }`}
            onClick={() => setSelectedGenre(g)}
          >
            {g === "all" ? "All Genres" : g}
          </button>
        ))}
      </div>

      {/* CREATE BOOK FORM CARD */}
      {showAddForm && (
        <div className="card mb-4 shadow-sm border-primary">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h5 className="card-title m-0">
              <i className="fa-solid fa-plus-circle me-2"></i> Add New Book To Library
            </h5>
            <small>Admin Entry</small>
          </div>
          <div className="card-body">
            <form onSubmit={handleAddSubmit}>
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Book Title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Clean Code"
                    required
                    value={newBook.title}
                    onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold">Author</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Robert C. Martin"
                    required
                    value={newBook.author}
                    onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold">Genre / Category</label>
                  <select
                    className="form-select"
                    value={newBook.genre}
                    onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Fiction & Literature">Fiction & Literature</option>
                    <option value="Science & Mathematics">Science & Mathematics</option>
                    <option value="History & Philosophy">History & Philosophy</option>
                    <option value="Business & Economics">Business & Economics</option>
                    <option value="Self-Improvement">Self-Improvement</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <label className="form-label fw-semibold">ISBN</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="978-..."
                    required
                    value={newBook.isbn}
                    onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
                  />
                </div>
                <div className="col-md-2">
                  <label className="form-label fw-semibold">Total Copies</label>
                  <input
                    type="number"
                    min="1"
                    className="form-control"
                    required
                    value={newBook.copies}
                    onChange={(e) => setNewBook({ ...newBook, copies: Number(e.target.value) })}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold">Shelf / Location</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Rack CS-101"
                    value={newBook.shelf}
                    onChange={(e) => setNewBook({ ...newBook, shelf: e.target.value })}
                  />
                </div>
                <div className="col-md-7">
                  <label className="form-label fw-semibold">Short Description / Notes</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Core edition for 2nd year curriculum"
                    value={newBook.description}
                    onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                  />
                </div>
              </div>
              <div className="mt-3">
                <button type="submit" className="btn btn-success me-2 fw-semibold">
                  <i className="fa-solid fa-floppy-disk me-1"></i> Save Book
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

      {/* UPDATE BOOK FORM CARD */}
      {editId && (
        <div className="card mb-4 shadow-sm border-warning">
          <div className="card-header bg-warning text-dark d-flex justify-content-between align-items-center">
            <h5 className="card-title m-0">
              <i className="fa-solid fa-pen-to-square me-2"></i> Edit Book (ID: {editId})
            </h5>
            <small>Admin Edit</small>
          </div>
          <div className="card-body">
            <form onSubmit={handleUpdateSubmit}>
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Book Title</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={editBook.title}
                    onChange={(e) => setEditBook({ ...editBook, title: e.target.value })}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold">Author</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={editBook.author}
                    onChange={(e) => setEditBook({ ...editBook, author: e.target.value })}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold">Genre / Category</label>
                  <select
                    className="form-select"
                    value={editBook.genre}
                    onChange={(e) => setEditBook({ ...editBook, genre: e.target.value })}
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Fiction & Literature">Fiction & Literature</option>
                    <option value="Science & Mathematics">Science & Mathematics</option>
                    <option value="History & Philosophy">History & Philosophy</option>
                    <option value="Business & Economics">Business & Economics</option>
                    <option value="Self-Improvement">Self-Improvement</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <label className="form-label fw-semibold">ISBN</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={editBook.isbn}
                    onChange={(e) => setEditBook({ ...editBook, isbn: e.target.value })}
                  />
                </div>
                <div className="col-md-2">
                  <label className="form-label fw-semibold">Total Copies</label>
                  <input
                    type="number"
                    min="1"
                    className="form-control"
                    required
                    value={editBook.copies}
                    onChange={(e) => setEditBook({ ...editBook, copies: Number(e.target.value) })}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold">Shelf / Location</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editBook.shelf}
                    onChange={(e) => setEditBook({ ...editBook, shelf: e.target.value })}
                  />
                </div>
                <div className="col-md-7">
                  <label className="form-label fw-semibold">Short Description</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editBook.description}
                    onChange={(e) => setEditBook({ ...editBook, description: e.target.value })}
                  />
                </div>
              </div>
              <div className="mt-3">
                <button type="submit" className="btn btn-warning me-2 fw-semibold">
                  <i className="fa-solid fa-check me-1"></i> Update Book
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

      {/* READ: BOOKS TABLE */}
      <div className="card shadow-sm border-0 rounded-3 overflow-hidden">
        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center py-2">
          <span className="fw-bold">
            <i className="fa-solid fa-list me-2"></i>
            Library Catalog ({filteredBooks.length} titles)
          </span>
          <small className="text-white-50">Manage physical copies & circulation</small>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered table-hover table-striped m-0 align-middle">
            <thead className="table-light">
              <tr>
                <th>Title & Description</th>
                <th>Author</th>
                <th>Genre</th>
                <th>ISBN</th>
                <th className="text-center">Shelf</th>
                <th className="text-center">Stock (Avail / Total)</th>
                <th className="text-center">Status</th>
                <th className="text-center" style={{ width: "240px" }}>
                  Admin Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-muted">
                    No books found matching criteria. Click <strong>+ Add New Book</strong> to add one!
                  </td>
                </tr>
              ) : (
                filteredBooks.map((b) => (
                  <tr key={b._id}>
                    <td>
                      <div className="fw-bold text-dark">{b.title}</div>
                      {b.description && (
                        <small className="text-muted d-block" style={{ fontSize: "12px" }}>
                          {b.description}
                        </small>
                      )}
                    </td>
                    <td>{b.author}</td>
                    <td>
                      <span className="badge bg-secondary-subtle text-secondary border">
                        {b.genre}
                      </span>
                    </td>
                    <td>
                      <small className="font-monospace text-muted">{b.isbn}</small>
                    </td>
                    <td className="text-center">
                      <span className="badge bg-light text-dark border">{b.shelf || "Rack A-1"}</span>
                    </td>
                    <td className="text-center">
                      <strong>{b.availableCopies}</strong> / {b.copies}
                    </td>
                    <td className="text-center">
                      {b.availableCopies > 0 ? (
                        <span className="badge badge-available">
                          <i className="fa-solid fa-circle-check me-1"></i> Available
                        </span>
                      ) : (
                        <span className="badge badge-issued">
                          <i className="fa-solid fa-circle-exclamation me-1"></i> All Issued
                        </span>
                      )}
                    </td>
                    <td>
                      <div className="d-flex justify-content-center gap-1">
                        {/* Quick Issue / Return buttons for Librarian */}
                        <button
                          className="btn btn-outline-success btn-sm px-2"
                          title="Issue a copy to member"
                          disabled={b.availableCopies <= 0}
                          onClick={() => handleIssue(b._id, b.title)}
                        >
                          <i className="fa-solid fa-hand-holding me-1"></i> Issue
                        </button>
                        <button
                          className="btn btn-outline-info btn-sm px-2 text-dark"
                          title="Return a copy"
                          disabled={b.availableCopies >= b.copies}
                          onClick={() => handleReturn(b._id, b.title)}
                        >
                          <i className="fa-solid fa-rotate-left me-1"></i> Return
                        </button>
                        <button
                          className="btn btn-warning btn-sm px-2"
                          title="Edit Book Details"
                          onClick={() => startEdit(b)}
                        >
                          <i className="fa-solid fa-pen"></i>
                        </button>
                        <button
                          className="btn btn-danger btn-sm px-2"
                          title="Remove Book"
                          onClick={() => deleteBook(b._id, b.title)}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
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

export default Product;