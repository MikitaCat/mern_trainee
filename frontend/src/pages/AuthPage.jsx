import React from 'react';
import { useState } from 'react';

export const AuthPage = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  //funcion for input treatment
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: [event.target.value] });
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Make Links Beautiful</h1>

        <div className="card red lighten-1">
          <div className="card-content white-text">
            <span className="card-title">Authorisation</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Enter your email"
                  className="color-input"
                  id="email"
                  type="text"
                  name="email"
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Enter your password"
                  id="password"
                  type="password"
                  name="password"
                  className="color-input"
                  onChange={changeHandler}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button className="btn red lighten-3" style={{ marginRight: 10 }}>
              Sing In
            </button>
            <button className="btn red lighten-2">Log in</button>
          </div>
        </div>
      </div>
    </div>
  );
};
