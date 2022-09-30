import { Form, Button, Spinner, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";

const QueryObras = ({ setSubmited, setResponse, setResponseLoading }) => {
  const [types, setTypes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  let typesToSend = [];

  useEffect(() => {
    async function fetchData() {
      await fetch("http://0.0.0.0:8000/obras/get-all-types").then((response) => {
        // first then()
        if (!response.ok) {
          throw Error(response.status);
        }
        else {
          return response.json();
        }
      }).then((data) => {
        if (data.length === 0) {
          throw Error("Não existem obras para serem mostradas");
        }
        const tArray = [];
        for (let t in data) {
          tArray.push(data[t].name);
        }
        console.log(tArray);
        setTypes(tArray);
      }).catch((err) => {
        console.log(err);
        setErrorMessage("Algo correu mal | " + err);
      })
      setLoading(false);
    }
    fetchData();
  }, [setLoading, setTypes]);

  function handleSelect(value) {
    let index = typesToSend.indexOf(value);
    if (index > -1) {
      typesToSend.splice(index, 1);
    }
    else {
      typesToSend.push(value);
    }
    console.log(typesToSend);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setResponseLoading(true);
    await fetch("http://0.0.0.0:8000/obras/get-by-type", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        mode: "Access-Control-Allow-Origin",
      },
      body: JSON.stringify(typesToSend),
    })
      .then(function (response) {
        // first then()
        if (response.ok) {
          setSubmited(true);
          return response.json();
        }
        throw new Error("Something went wrong.", response);
      })
      .then(function (data) {
        console.log("Request successful", data);
        setResponse(data);
      })
      .catch(function (err) {
        console.log("Request failed", err);
      });
    setResponseLoading(false);
  }

  return (
    <>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        !types ? <><Alert variant="danger">{errorMessage}</Alert></> :
          (<>
            <h3>Encontre a sua obra</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Label>Tipo</Form.Label>
              {types.map((type) => (
                <Form.Check
                  key={"type-checkbox-" + type}
                  type={"checkbox"}
                  id={"type-checkbox-" + type}
                  label={type}
                  value={type}
                  onChange={(e) => handleSelect(e.target.value)}
                />
              ))}
              <Button type="submit">Pesquisar</Button>
            </Form>
          </>
          )
      )}
    </>
  );
};

export default QueryObras;
