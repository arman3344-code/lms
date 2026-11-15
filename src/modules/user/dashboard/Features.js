import React from "react";
import { Link } from "react-router-dom";

export default function Features() {
  const sections = [
    {
      icon: "fa-solid fa-laptop-code text-primary",
      title: "Computer Science & IT",
      rack: "Racks CS-101 to CS-110",
      desc: "Algorithms, Data Structures, Web Engineering, Machine Learning, Operating Systems, and Cyber Security.",
      tag: "50+ Titles",
    },
    {
      icon: "fa-solid fa-book-open-reader text-success",
      title: "Fiction & Literature",
      rack: "Racks LIT-201 to LIT-220",
      desc: "World classics, contemporary fiction, historical novels, poetry, drama, and anthologies.",
      tag: "120+ Titles",
    },
    {
      icon: "fa-solid fa-microscope text-info",
      title: "Science & Mathematics",
      rack: "Racks SCI-301 to SCI-315",
      desc: "Theoretical physics, calculus, organic chemistry, astrophysics, biology, and research journals.",
      tag: "80+ Titles",
    },
    {
      icon: "fa-solid fa-landmark text-warning",
      title: "History & Philosophy",
      rack: "Racks HIST-401 to HIST-412",
      desc: "Ancient civilizations, modern world history, political science, ethics, and philosophical treatises.",
      tag: "65+ Titles",
    },
    {
      icon: "fa-solid fa-chart-line text-danger",
      title: "Business & Economics",
      rack: "Racks BUS-501 to BUS-510",
      desc: "Entrepreneurship, micro/macro economics, financial markets, leadership, and startup playbooks.",
      tag: "45+ Titles",
    },
    {
      icon: "fa-solid fa-brain text-secondary",
      title: "Self-Improvement & Psychology",
      rack: "Racks SELF-601 to SELF-608",
      desc: "Productivity, behavioral psychology, communication mastery, and personal development.",
      tag: "40+ Titles",
    },
  ];

  return (
    <div className="container-fluid p-3">
      <div className="text-center mb-4">
        <span className="badge bg-primary px-3 py-2 fs-6 rounded-pill mb-2">
          Library Directory
        </span>
        <h2 className="fw-bold">Book Genres & Shelf Directory</h2>
        <p className="text-muted col-md-8 mx-auto small">
          Explore catalog classifications and physical rack locations across all reading wings.
        </p>
      </div>

      <div className="row g-4 row-cols-1 row-cols-md-2 row-cols-lg-3">
        {sections.map((s, index) => (
          <div className="col" key={index}>
            <div className="card h-100 shadow-sm border-0 rounded-3 book-card">
              <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <i className={`${s.icon} fs-2`}></i>
                  <span className="badge bg-light text-dark border">{s.tag}</span>
                </div>
                <h5 className="card-title fw-bold text-dark">{s.title}</h5>
                <p className="text-primary small fw-semibold mb-2">{s.rack}</p>
                <p className="card-text text-muted small flex-grow-1">{s.desc}</p>
                <div className="mt-3 pt-2 border-top">
                  <Link
                    to="/landing/products"
                    className="btn btn-outline-primary btn-sm w-100 fw-semibold"
                  >
                    View Books in this Section &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


