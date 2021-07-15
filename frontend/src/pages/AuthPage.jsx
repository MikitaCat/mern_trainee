import React from 'react';
import { useState, useEffect } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

export const AuthPage = () => {
  const message = useMessage();
  const { loading, request, error, clearErrors } = useHttp();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    message(error);
    clearErrors();
  }, [error, message, clearErrors]);

  //funcion for input treatment
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  //Registration function
  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form });
      message(data.message);
    } catch (e) {}
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
            <button className="btn red lighten-3" disabled={loading} style={{ marginRight: 10 }}>
              Sing In
            </button>
            <button className="btn red lighten-2" onClick={registerHandler} disabled={loading}>
              Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
