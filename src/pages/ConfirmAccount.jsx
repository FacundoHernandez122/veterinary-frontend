import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosURL from "../config/axios";
import Alert from "../components/Alert";
import "../index.css";

function ConfirmAccount() {
  const [confirmedAccount, setConfirmedAccount] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({});

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `/vets/confirm/${id}`;

        const response = await axiosURL(url);

        if (response.status === 200) {
          setConfirmedAccount(true);
          setAlert({
            msg: response.data.msg,
            error: false,
          });
        }
      } catch (error) {}
      setLoading(false);
    };
    confirmAccount();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-cyan-500 font-black text-5xl">
          Confirm your account{" "}
          <span className="text-white"> and start managing your patients!</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-10 py-10 rounded-xl ring ring-cyan-950 ring-opacity-10">
        {!loading && <Alert alert={alert} />}
        {confirmedAccount && (
          <Link className="block text-center my-5 text-white border " to="/">
            Log In
          </Link>
        )}
      </div>
    </>
  );
}

export default ConfirmAccount;
