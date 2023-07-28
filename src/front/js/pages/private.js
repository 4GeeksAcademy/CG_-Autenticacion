import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";

export const Private = () => {
  const navigate = useNavigate();
  const { actions, store } = useContext(Context);

  const handleLogOut = () => {
    actions.logOut();
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token ) {
      navigate("/notFound");
    }
  }, []);

  return (
    <div className="container justify-content-center">
      <h1 className="text-center">Welcome, Ehiber!</h1>
      <br />

      <div className="card m-auto" style={{ width: "18rem" }}>
        <img
          src="https://ichef.bbci.co.uk/news/640/amz/worldservice/live/assets/images/2015/11/23/151123131819_milton_seres_624x351_getty_nocredit.jpg"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">Ehiber</h5>
          <div className="card-text">
            <ul>
              <li>30 años</li>
              <li>Programador</li>
              <li>Hobbies: Ayudar a Carlos en el proyecto final</li>
            </ul>
          </div>
          <button
            to="/home"
            className="btn btn-danger d-flex m-auto "
            onClick={handleLogOut}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};