import React, { useState } from "react";
import usePatients from "../hooks/usePatients";
import "./PatientList.css";
import Patient from "./Patient";

function PatientList() {
  const { patients } = usePatients();
  const [searchTerm, setSearchTerm] = useState("");

  // Filtra los pacientes según el término de búsqueda
  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="search-container mb-3 text-center">
        <input
          className="p-2 border searcher "
          type="text"
          placeholder="Search patients by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {filteredPatients.length ? (
        <>
          {filteredPatients.map((patient) => (
            <Patient key={patient._id} patient={patient} />
          ))}
        </>
      ) : (
        <>
          <h2 className="patientstitle">
            No patients found with the given search criteria.
          </h2>
        </>
      )}
    </>
  );
}

export default PatientList;
