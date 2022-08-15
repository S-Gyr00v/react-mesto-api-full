import React, { useState } from "react";

function Login(props) {
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
    props.handleLogin({ email, password });
  }

  return (
    <div className="login">
      <h1 className="login__title">Вход</h1>
      <form className="login__form" onSubmit={handleSubmit}>
        <label className="login-name" htmlFor="email">
          <input
            type="text"
            id="login-name"
            placeholder="Email"
            className="login__input"
            required=""
            minLength={2}
            maxLength={40}
            onChange={handleChangeEmail}
            value={email}
          />
        </label>
        <label className="login-password" htmlFor="password">
          <input
            type="password"
            id="login-password"
            className="login__input"
            placeholder="Пароль"
            required=""
            minLength={2}
            maxLength={200}
            onChange={handleChangePassword}
            value={password}
          />
        </label>
        <button type="submit" className="login__button">
          Войти
        </button>
      </form>
    </div>
  );
}
export default Login;
