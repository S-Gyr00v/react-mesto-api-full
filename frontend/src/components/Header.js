import React from "react";
import logo from "../../src/images/header-logo.svg";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header({ loggedIn, name, path, email, handleLogout }) {
  return (
    <div className="header">
      <img className="header__logo" alt="Место Россия" src={logo} />
      <div className="header__login-box">
        {loggedIn && <span className="header__link login__link"> {email}</span>}

        <Link
          to={path}
          onClick={handleLogout}
          className="header__link login__link"
        >
          {name}
        </Link>
      </div>
    </div>
  );
}
