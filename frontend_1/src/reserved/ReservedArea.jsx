import { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import "./ReservedArea.css";
import ObraSubmission from "./ObraSubmission";

const ReservedArea = () => {
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const url = "http://0.0.0.0:8000/users/login";

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then(function (response) {
      setLoading(false);
      if (response.ok) {
        setAccepted(true);
      }
      if (response.status === 403) {
        setErrorMessage("Wrong password/username")
      }
    }).catch((err) => {
      setErrorMessage("Server is not available right now");
      console.log(err);
    })
    setLoading(false);
  }
  const LoginForm = (
    <>
      <h1>Área Reservada</h1>
      <Form className="form" onSubmit={handleSubmit}>
        <Form.Group className="login-input-container">
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </Form.Group>
        {!loading ? (
          <Button variant="primary" type="submit">
            Login
          </Button>
        ) : (
          <Button variant="primary" disabled>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <span className="visually-hidden">Loading...</span>
          </Button>
        )}
        <div style={{ color: "red" }}>{errorMessage}</div>
      </Form>
    </>
  );
  return !accepted ? LoginForm : <ObraSubmission />;
};

export default ReservedArea;
