import React from "react";
import AdminNav from "../components/AdminNav";
import "./ChangePassword.css";
import Alert from "../components/Alert";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

function ChangePassword() {
  const { savePassword } = useAuth();

  const [alert, setAlert] = useState({});
  const [password, setPassword] = useState({
    current_password: "",
    new_password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(password).some((campo) => campo === "")) {
      setAlert({
        msg: "All fields are required",
        error: true,
      });
      return;
    }

    if (password.new_password.length < 8) {
      setAlert({
        msg: "The password is very short, add at least 8 characters",
        error: true,
      });
      return;
    }
    const response = await savePassword(password);
    setAlert(response);
  };

  const { msg } = alert;
  return (
    <>
      <AdminNav />
      <div className="container mt-5">
        <div className="changepassword">
          <p>
            Reset your password <span className="here">here</span>
          </p>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6  shadow rounded-lg p-5 my-4">
            {msg && <Alert alert={alert} />}
            <form onSubmit={handleSubmit}>
              <div className="form-group my-3">
                <label className="text-uppercase font-extrabold text-white">
                  Current Password
                </label>
                <input
                  type="password"
                  className="form-control mt-3"
                  name="current_password"
                  placeholder="Current password..."
                  onChange={(e) =>
                    setPassword({
                      ...password,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group my-3">
                <label className="text-uppercase font-extrabold text-white">
                  New Password
                </label>
                <input
                  type="password"
                  className="form-control mt-3"
                  name="new_password"
                  placeholder="New password..."
                  onChange={(e) =>
                    setPassword({
                      ...password,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-cyan-700 px-4 py-2 font-weight-bold text-white border rounded-lg text-uppercase w-50 mt-5 mx-auto"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
