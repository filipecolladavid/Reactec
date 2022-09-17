import { Form, Button, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";

const QueryObras = ({ setSubmited, setResponse, setResponseLoading }) => {
  const [types, setTypes] = useState(null);
  const [loading1, setLoading] = useState(true);
  const [typesSelec, setTypesSelect] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://0.0.0.0:8000/obras/get-all-types");
      const data = await response.json();
      const tArray = [];
      for (let t in data) {
        tArray.push(data[t].name);
      }
      console.log(tArray);
      setTypes(tArray);
      setLoading(false);
    }
    fetchData();
  }, [setLoading, setTypes]);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(typesSelec)
    setResponseLoading(true);
    console.log(typesSelec)
    const response = await fetch("http://0.0.0.0:8000/obras/get-by-type", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        mode: "Access-Control-Allow-Origin",
      },
      body: JSON.stringify(typesSelec),
    })
      .then(function (response) {
        // first then()
        if (response.ok) {
          setSubmited(true);
          return response.json();
        }
        throw new Error("Something went wrong.", response);
      })
      .then(function (text) {
        // second then()
        console.log("Request successful", text);
        return text;
      })
      .catch(function (error) {
        // catch
        console.log("Request failed", error);
      });

    // setObraName(response.name);

    setResponse(response);
    setResponseLoading(false);
  }

  return (
    <>
      {loading1 ? (
        <Spinner />
      ) : (
        <>
          <h3>Encontre a sua obra</h3>
          <Form onSubmit={handleSubmit}>
            <h4>Escolha por tipo</h4>
            <Form.Label>Tipo</Form.Label>
            {types.map((type) => (
              <Form.Check
                key={"type-checkbox-" + type}
                type={"checkbox"}
                id={"type-checkbox-" + type}
                label={type}
                value={type}
                onChange={(e) => typesSelec.push(e.target.value)}
              />
            ))}
            <Button type="submit">Pesquisar</Button>
          </Form>
        </>
      )}
    </>
  );
};

export default QueryObras;
