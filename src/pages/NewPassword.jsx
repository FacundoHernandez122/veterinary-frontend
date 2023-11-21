import { React, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alert from "../components/Alert";
import axiosURL from "../config/axios";

function NewPassword() {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [alert, setAlert] = useState({});
  const [validToken, setValidToken] = useState(false);
  const [modifiedPassword, setModifiedPassword] = useState(false);

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const confirmToken = async () => {
      try {
        await axiosURL(`/vets/forgot-password/${token}`);

        setValidToken(true);
      } catch (error) {
        setAlert({
          msg: "There was an error with the link",
          error: true,
        });
      }
    };
    confirmToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([password, repeatPassword].includes("")) {
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

    try {
      const url = `/vets/forgot-password/${token}`;
      const { data } = await axiosURL.post(url, { password, repeatPassword });

      setAlert({
        msg: data.msg,
      });
      modifiedPassword(true);
    } catch (error) {
      setAlert({ msg: error.response.data.msg, error: true });
    }
  };

  const { msg } = alert;

  return (
    <>
      <div>
        <h1 className="text-cyan-500 font-black text-6xl">
          Reset <span className="text-white"> your</span> password
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-10 py-10 rounded-xl ring ring-cyan-950 ring-opacity-10">
        {msg && <Alert alert={alert} />}
        {validToken && (
          <>
            <form onSubmit={handleSubmit}>
              <div className="my-5">
                <label
                  className="uppercase text-white block text-xl font-bold "
                  htmlFor=""
                >
                  New Password
                </label>
                <input
                  className="border w-full p-3 mt-3 bg-gray-200 rounded-xl"
                  type="password"
                  placeholder="New Password..."
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
                  Confirm New Password
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
                value="Reset Password"
                className=" bg-cyan-500 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-10 hover:cursor-pointer hover:bg-cyan-700 md:w-auto"
              />
            </form>
          </>
        )}
        {modifiedPassword && (
          <Link className="text-cyan-400 mt-5" to="/">
            <span>Log In</span>
          </Link>
        )}
      </div>
    </>
  );
}

export default NewPassword;
