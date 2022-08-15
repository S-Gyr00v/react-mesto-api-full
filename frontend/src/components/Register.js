import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.handleRegister({ email, password });
  }

  return (
    <div className="login">
      <h1 className="login__title">Регистрация</h1>
      <form className="login__form" onSubmit={handleSubmit}>
        <label className="login-name">
          <input
            type="text"
            id="login-name"
            placeholder="Email"
            className="login__input"
            required=""
            minLength={2}
            maxLength={40}
            name="email"
            value={email}
            onChange={handleChangeEmail}
          />
        </label>
        <label className="login-password">
          <input
            type="password"
            id="login-password"
            className="login__input"
            name="password"
            placeholder="Пароль"
            required=""
            minLength={2}
            maxLength={200}
            value={password}
            onChange={handleChangePassword}
          />
        </label>
        <button type="submit" className="login__button">
          Зарегистрироваться
        </button>
      </form>
      <Link to="/sign-in" className="login__link">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
}
export default Register;
