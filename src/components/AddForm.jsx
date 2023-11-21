import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./AddForm.css";
import { useState, useEffect } from "react";
import Alert from "./Alert";
import usePatients from "../hooks/usePatients";

function AddForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [owner, setOwner] = useState("");
  const [date, setDate] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [id, setId] = useState(null);

  const [alert, setAlert] = useState({});
  const [reloadPage, setReloadPage] = useState(false);

  const { savePatient, patient } = usePatients();

  useEffect(() => {
    if (patient?.name) {
      setName(patient.name);
      setEmail(patient.email);
      setOwner(patient.owner);
      setDate(patient.date);
      setSymptoms(patient.symptoms);
      setId(patient._id);
    }
  }, [patient]);

  useEffect(() => {
    const handleReload = async () => {
      if (reloadPage) {
        await new Promise((resolve) => setTimeout(resolve, 0));
        window.location.reload();
      }
    };

    handleReload();
  }, [reloadPage]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([name, email, owner, date, symptoms].includes("")) {
      setAlert({
        msg: "All fields are required",
        error: true,
      });
      return;
    }

    savePatient({ name, email, owner, date, symptoms, id });
    setAlert({ msg: "Saved Successfully" });
    setReloadPage(true); // Indica que la página debe recargarse

    // Limpiar los campos
    setName("");
    setOwner("");
    setEmail("");
    setSymptoms("");
    setDate("");
  };

  const { msg } = alert;

  return (
    <div className="mb-5 pb-5">
      <h2 className="patientstitle text-cyan-500 mb-5 ">Add your Patients</h2>
      <Form className="color_form">
        <Row className="mb-3 ">
          <Form.Group as={Col} sm={12} md={6} lg={4}>
            <Form.Label
              htmlFor="name"
              className="uppercase"
              style={{ fontWeight: "bold" }}
            >
              Pet Name *
            </Form.Label>
            <Form.Control
              id="name"
              type="name"
              placeholder="Enter Pet Name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} sm={12} md={6} lg={4}>
            <Form.Label
              htmlFor="pet-breed"
              className="uppercase"
              style={{ fontWeight: "bold" }}
            >
              Pet Breed
            </Form.Label>
            <Form.Control
              id="pet-breed"
              type="name"
              placeholder="Enter Pet Breed..."
            />
          </Form.Group>

          <Form.Group as={Col} sm={12} md={6} lg={4}>
            <Form.Label
              htmlFor="pet-age"
              className="uppercase"
              style={{ fontWeight: "bold" }}
            >
              Pet Age
            </Form.Label>
            <Form.Control id="pet-age" type="number" placeholder="Age..." />
          </Form.Group>
        </Row>
        <Row className="mb-3 ">
          <Form.Group as={Col} sm={12} md={6} lg={4}>
            <Form.Label
              htmlFor="symptoms"
              className="uppercase"
              style={{ fontWeight: "bold" }}
            >
              Symptoms *
            </Form.Label>
            <Form.Control
              id="symptoms"
              type="name"
              placeholder="Symptoms..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3 ">
          <Form.Group as={Col} sm={12} md={6} lg={4}>
            <Form.Label
              htmlFor="owner"
              className="uppercase"
              style={{ fontWeight: "bold" }}
            >
              Owner´s Name *
            </Form.Label>
            <Form.Control
              id="owner"
              type="name"
              placeholder="Enter Owner Name..."
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} sm={12} md={6} lg={4}>
            <Form.Label
              htmlFor="email"
              className="uppercase"
              style={{ fontWeight: "bold" }}
            >
              Email *
            </Form.Label>
            <Form.Control
              id="email"
              type="email"
              placeholder="Enter email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} sm={12} md={6} lg={4}>
            <Form.Label
              htmlFor="phone"
              className="uppercase"
              style={{ fontWeight: "bold" }}
            >
              Phone
            </Form.Label>
            <Form.Control id="phone" type="number" placeholder="Phone..." />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label
            htmlFor="address"
            className="uppercase"
            style={{ fontWeight: "bold" }}
          >
            Address
          </Form.Label>
          <Form.Control id="address" placeholder="Complete Address..." />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label
            htmlFor="date"
            className="uppercase"
            style={{ fontWeight: "bold" }}
          >
            Date of Admission *
          </Form.Label>
          <Form.Control
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} className="text-center">
            <input
              className="forminput mb-4 w-60"
              type="submit"
              onClick={handleSubmit}
              value={id ? "Save Changes" : "Add Patient"}
            />
          </Form.Group>
        </Row>
        {msg && <Alert alert={alert} />}
      </Form>
    </div>
  );
}

export default AddForm;
