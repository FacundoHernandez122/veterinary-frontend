import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Alert from "../components/Alert";
import axiosURL from "../config/axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, email, password, repeatPassword].includes("")) {
      setAlert({ msg: "There are empty fields", error: true });
      return;
    }
    if (password !== repeatPassword) {
      setAlert({ msg: "The passwords are different", error: true });
      return;
    }
    if (password.length < 8) {
      setAlert({
        msg: "The password is very short, add at least 8 characters",
        error: true,
      });
      return;
    }
    setAlert({});

    try {
      await axiosURL.post("/vets", { name, email, password });
      setAlert({
        msg: "User created successfully, check your email to confirm",
        error: false,
      });
    } catch (error) {
      setAlert({ msg: error.response.data.msg, error: true });
    }
  };

  const { msg } = alert;

  return (
    <>
      <div>
        <h1 className="text-cyan-500 font-black text-5xl">
          Sign up <span className="text-white">and manage your patients</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-10 py-10 rounded-xl ring ring-cyan-950 ring-opacity-10">
        {msg && <Alert alert={alert} />}
        <form onSubmit={handleSubmit}>
          <div className="mt-5">
            <label
              className="uppercase text-white block text-xl font-bold "
              htmlFor=""
            >
              Name
            </label>
            <input
              className="border w-full p-3 mt-3 bg-gray-200 rounded-xl"
              type="text"
              placeholder="Name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div className="mt-5">
            <label
              className="uppercase text-white block text-xl font-bold "
              htmlFor=""
            >
              Email
            </label>
            <input
              className="border w-full p-3 mt-3 bg-gray-200 rounded-xl"
              type="email"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div className="mt-5">
            <label
              className="uppercase text-white block text-xl font-bold "
              htmlFor=""
            >
              Password
            </label>
            <input
              className="border w-full p-3 mt-3 bg-gray-200 rounded-xl"
              type="password"
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          <div className="mt-5">
            <label
              className="uppercase text-white block text-xl font-bold "
              htmlFor=""
            >
              Repeat Password
            </label>
            <input
              className="border w-full p-3 mt-3 bg-gray-200 rounded-xl"
              type="password"
              placeholder="Repeat password..."
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>

          <input
            type="submit"
            value="Sign up"
            className=" bg-cyan-500 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-10 hover:cursor-pointer hover:bg-cyan-700 md:w-auto"
          />
        </form>
        <nav className="text-white mt-5 lg:flex lg:justify-between ">
          <div className="block text-center  text-cyan-700">
            You do have an account?{" "}
            <Link to="/">
              {" "}
              <span className="text-cyan-400">Log In</span>
            </Link>
          </div>
          <div className="block text-center text-cyan-400">
            <Link to="/forgot-password"> I forgot my password</Link>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Register;
