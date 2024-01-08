import React from "react";
import "../assets/css/sidebar.css";
import Logo from "../assets/img/PngItem_3944726.png";
import { Link } from "react-router-dom";
import LogOut from "../assets/img/log-out.png";

const Sidebar = () => {
  return (
    <div
      className="sidebar"
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      <img
        src={Logo}
        style={{ width: "25%", marginLeft: "10%" }}
        className="logo"
        alt="Logo"
      />
      <Link to="/recepti" className="sidebar-link">
        Recepti
      </Link>
      <ul className="submenu">
        <li>
          <Link to="/recepti" className="submenu-link">
            Pregled receptov
          </Link>
        </li>
        <li
          style={{
            display: sessionStorage.getItem("userId") ? "block" : "none",
          }}
        >
          <Link to="/recept/dodaj" className="submenu-link">
            Dodaj recept
          </Link>
        </li>
      </ul>
      <Link to="/sestavine" className="sidebar-link">
        Sestavine
      </Link>
      <ul className="submenu">
        <li>
          <Link to="/sestavine" className="submenu-link">
            Pregled sestavin
          </Link>
        </li>
        <li
          style={{
            display: sessionStorage.getItem("userId") ? "block" : "none",
          }}
        >
          <Link to="/sestavine/dodaj" className="submenu-link">
            Dodaj sestavino
          </Link>
        </li>
      </ul>
      <div style={{ marginTop: "auto", marginBottom: "10px" }}>
        {sessionStorage.getItem("userId") ? (
          <img
            src={LogOut}
            style={{
              width: "15%",
              marginRight: "5%",
              float: "right",
              cursor: "pointer",
            }}
            className="logo"
            alt="Logo"
            onClick={() => {
              sessionStorage.removeItem("userId");
              window.location.reload();
            }}
          />
        ) : (
          <Link to="/authentication" className="sidebar-link">
            Prijavi se
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
