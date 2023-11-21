import React from "react";
import AddForm from "../components/AddForm";
import PatientList from "../components/PatientList";
import "./ManagePatients.css";

function ManagePatients() {
  return (
    <div className="bg-color-div">
      <div>
        <AddForm />
      </div>
      <div>
        <PatientList />
      </div>
    </div>
  );
}

export default ManagePatients;
