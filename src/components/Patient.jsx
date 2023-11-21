import "./Patient.css";
import usePatients from "../hooks/usePatients";

function Patient({ patient }) {
  const { setEdition, deletePatient } = usePatients();

  const { name, email, date, owner, _id, symptoms } = patient;

  const resetDate = (date) => {
    const newDate = new Date(date);
    return new Intl.DateTimeFormat("en", { dateStyle: "long" }).format(newDate);
  };

  return (
    <div className="list_patient mx-5 mt-10 mb-96 shadow-md px-5 py-10 rounded-xl">
      <p className="font-bold uppercase text-cyan-400 my-3">
        Pet Name:{" "}
        <span className="font-normal normal-case text-white">{name}</span>
      </p>
      <p className="font-bold uppercase text-cyan-400 my-3">
        Owner:{" "}
        <span className="font-normal normal-case text-white">{owner}</span>
      </p>
      <p className="font-bold uppercase text-cyan-400 my-3">
        Email:{" "}
        <span className="font-normal normal-case text-white">{email}</span>
      </p>
      <p className="font-bold uppercase text-cyan-400 my-3">
        Date:{" "}
        <span className="font-normal normal-case text-white">
          {resetDate(date)}
        </span>
      </p>
      <p className="font-bold uppercase text-cyan-400 my-3">
        Symptoms:{" "}
        <span className="font-normal normal-case text-white">{symptoms}</span>
      </p>

      <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center">
        <button
          type="button"
          className="py-2 px-4 lg:px-10 bg-cyan-700 hover:bg-cyan-800 text-white uppercase font-bold rounded-lg mb-2 lg:mb-0"
          onClick={() => setEdition(patient)}
        >
          Edit
        </button>
        <button
          type="button"
          className="py-2 px-4 lg:px-10 bg-red-700 hover:bg-red-800 text-white uppercase font-bold rounded-lg"
          onClick={() => deletePatient(_id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Patient;
