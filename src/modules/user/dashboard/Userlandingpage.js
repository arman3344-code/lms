import React, { Fragment, useEffect } from "react";
import Header from "../sharecomponents/Header";
import Sidebar from "../sharecomponents/Sidebar";
import Footer from "../sharecomponents/Footer";
import { Outlet, useNavigate } from "react-router-dom";

function Userlandingpage() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <Fragment>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 p-0">
            <Sidebar />
          </div>
          <div className="col-md-10 fix-height p-4">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}

export default Userlandingpage;
