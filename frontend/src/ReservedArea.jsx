import { useState } from "react";
import { Button } from "bootstrap";
import { Spinner } from "react-bootstrap";
import "./ReservedArea.css";
import ObraSubmission from "./ObraSubmission";

const ReservedArea = () => {
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const url = "http://localhost:8000/users/login";

  async function handleSubmit() {
    setLoading(true);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }).then(function (response) {
      setLoading(false);
      if (response.ok) {
        setAccepted(true);
      }
      if (response.status == 403) {
        setErrorMessage("Wrong password/username");
      }
    });
  }
  const Form = (
    <div className="form">
      <h1>Area Reservada</h1>
      <div className="input-container">
        <label>Username </label>
        <input type="text" onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="input-container">
        <label>Password </label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="button-container">
        <button onClick={handleSubmit}>Enviar</button>
      </div>
      <div className="error-container">{errorMessage}</div>
    </div>
  );
  return <div>{!accepted ? Form : <ObraSubmission />}</div>;
};

export default ReservedArea;
