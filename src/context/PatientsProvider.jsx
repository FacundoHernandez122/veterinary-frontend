import { createContext, useState, useEffect } from "react";
import axiosURL from "../config/axios";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

const PatientsContext = createContext();

export const PatientsProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState({});
  const { auth } = useAuth();

  useEffect(() => {
    const getPatient = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axiosURL("/patients", config);
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    getPatient();
  }, [auth]);

  const savePatient = async (patient) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    if (patient.id) {
      try {
        const { data } = await axiosURL.put(
          `/patients/${patient.id}`,
          patient,
          config
        );

        const updatedPatients = patients.map((patientState) =>
          patientState._id === data._id ? data : patientState
        );
        setPatients(updatedPatients);
      } catch (error) {
        console.error("Error updating patient:", error);
      }
    } else {
      try {
        const { data } = await axiosURL.post("/patients", patient, config);
        const { createdAt, updatedAt, __v, ...savePatient } = data;
        setPatients([savePatient, ...patients]);

        // Establece la bandera para recargar la página después de agregar un paciente
        window.location.reloadAfterSave = true;
      } catch (error) {
        console.error("Error saving patient:", error);
      }
    }
  };

  const setEdition = (patient) => {
    setPatient(patient);
  };

  const deletePatient = async (id) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const { data } = await axiosURL.delete(`/patients/${id}`, config);

        const updatedPatients = patients.filter(
          (patient) => patient._id !== id
        );
        setPatients(updatedPatients);

        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  return (
    <PatientsContext.Provider
      value={{
        patients,
        savePatient,
        setEdition,
        patient,
        deletePatient,
      }}
    >
      {children}
    </PatientsContext.Provider>
  );
};

export default PatientsContext;
