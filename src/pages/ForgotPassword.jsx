import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import axiosURL from "../config/axios";
import { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "") {
      setAlert({ msg: "The field email is required", error: true });
      return;
    }
    try {
      const { data } = await axiosURL.post("/vets/forgot-password", { email });
      setAlert({ msg: data.msg });
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alert;

  return (
    <>
      <div>
        <h1 className="text-cyan-500 font-black text-5xl">
          Recover your <span className="text-white">password</span>
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
              Email
            </label>
            <input
              className="border w-full p-3 mt-3 bg-gray-200 rounded-xl"
              type="email"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Send"
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
          <div className="block text-center  text-cyan-700">
            You do not have an account?{" "}
            <Link to="/register">
              {" "}
              <span className="text-cyan-400">Sign up</span>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}

export default ForgotPassword;
