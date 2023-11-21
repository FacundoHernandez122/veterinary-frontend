import React, { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import "./EditProfile.css";
import useAuth from "../hooks/useAuth";
import Alert from "../components/Alert";

function EditProfile() {
  const { auth, updateProfile } = useAuth();
  const [profile, setProfile] = useState(auth);
  const [alert, setAlert] = useState({});

  useEffect(() => {
    if (auth && Object.keys(auth).length > 0) {
      setProfile(auth);
    }
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email } = profile;

    if ([name, email].includes("")) {
      setAlert({
        msg: "Email or Name are required",
        error: true,
      });
      return;
    }
    const result = await updateProfile(profile);
    setAlert(result);
  };

  const { msg } = alert;

  return (
    <>
      <AdminNav />
      <div className="container mt-5">
        <div className="editprofile">
          <p>
            Edit your profile <span className="here"> here</span>
          </p>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6  shadow rounded-lg p-5 my-4">
            {msg && <Alert alert={alert} />}
            <form onSubmit={handleSubmit}>
              <div className="form-group my-3">
                <label className="text-uppercase font-extrabold text-white">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control mt-3"
                  name="name"
                  value={profile.name || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, [e.target.name]: e.target.value })
                  }
                />
              </div>
              <div className="form-group my-3">
                <label className="text-uppercase font-extrabold text-light">
                  Web Site
                </label>
                <input
                  type="text"
                  className="form-control mt-3"
                  name="web"
                  value={profile.web || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, [e.target.name]: e.target.value })
                  }
                />
              </div>
              <div className="form-group my-3">
                <label className="text-uppercase font-extrabold text-light">
                  Phone
                </label>
                <input
                  type="number"
                  className="form-control mt-3"
                  name="phone"
                  value={profile.phone || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, [e.target.name]: e.target.value })
                  }
                />
              </div>
              <div className="form-group my-3">
                <label className="text-uppercase font-extrabold text-light">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control mt-3"
                  name="email"
                  value={profile.email || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, [e.target.name]: e.target.value })
                  }
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-cyan-700 px-4 py-2 font-weight-bold text-white border rounded-lg text-uppercase w-50 mt-5 mx-auto"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
