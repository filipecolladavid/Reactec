import { Col, Row, Button, Form } from "react-bootstrap";
import { useState } from "react";
import TypeSelectBox from "./TypeSelectBox";
import { useEffect } from "react";

const FormObraText = ({ types, setTypes, setSubmited, setObraName }) => {
  const distr = [
    "Aveiro",
    "Beja",
    "Braga",
    "Bragança",
    "Castelo Branco",
    "Coimbra",
    "Evora",
    "Faro",
    "Guarda",
    "Leiria",
    "Portalegre",
    "Porto",
    "Santarem",
    "Setubal",
    "Viana do Castelo",
    "Vila do Real",
    "Viseu",
  ];

  const [newType, setNewType] = useState("");
  const [typeError, setTypeError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    nameDisplayed: "",
    startDate: "",
    endDate: "",
    district: "",
    desc: "",
  });

  function addNewType(str) {
    setTypeError("")
    setNewType("");
    let newArray = types;
    if (types.some(e => e.name === str)) setTypeError("Tipo já existe na lista");
    else {
      newArray.push({ id: Math.max(...types.map(o => o.id)) + 1, name: str, selected: true });
    }
    setTypes(newArray);
  }

  useEffect(() => {
    console.log(types);
  }, [types]);

  function handleUpdateType(str) {
    const newTypes = types.map((obj) => {
      if (obj.name === str) {
        return { ...obj, selected: !obj.selected };
      }
      return obj;
    });
    setTypes([...newTypes]);
  }


  async function handleSubmit(e) {

    e.preventDefault();

    const response = await fetch("http://0.0.0.0:8000/obras/create-obra", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        mode: "Access-Control-Allow-Origin",
      },
      body: JSON.stringify(formData),
    })
      .then(function (response) {
        // first then()
        if (response.ok) {
          setSubmited(true);
          return response.json();
        } else if (response.status === 400) {
          setErrorMessage("Obra já existe, escolha outro nome");
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

    if (response) setObraName(response.name);
  }

  return (
    <Form
      style={{ width: "40rem", paddingTop: "2rem" }}
      onSubmit={handleSubmit}
    >
      <Row>
        <Form.Group controlId="formGridName">
          <Form.Label>Nome da Obra</Form.Label>
          <Form.Control
            required
            placeholder="Nome a ser exibido"
            onChange={(e) =>
              setFormData({ ...formData, nameDisplayed: e.target.value })
            }
          />
          <div className="error nameObra">{errorMessage}</div>
        </Form.Group>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="formGridState">
            <Form.Label>Distrito</Form.Label>
            <Form.Select
              required
              defaultValue="Distrito"
              onChange={(e) =>
                setFormData({ ...formData, district: e.target.value })
              }
            >
              <option>Selectione a zona</option>
              {distr.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formGridDate">
            <Form.Label>Datas</Form.Label>
            <div className="start-date">
              <label htmlFor="start">Start date:</label>
              <input
                type="date"
                id="start"
                name="trip-start"
                min="2010-01-01"
                required
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
              ></input>
            </div>
            <div className="end-date">
              <label htmlFor="end">End date:</label>

              <input
                type="date"
                id="end"
                name="trip-end"
                placeholder="dd-mm-yyyy"
                min="2010-01-01"
                required
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
              ></input>
            </div>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Form.Group controlId="formGridTypes">
          <Form.Label>Tipos</Form.Label>
          <TypeSelectBox types={types} handleUpdateType={handleUpdateType} />
        </Form.Group>
      </Row>
      <Row>
        <Form.Group controlId="formGridAddTypes">
          <Form.Label>Adicionar Tipo</Form.Label>
          <Form.Control
            placeholder="Tipo de Obra"
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
          />
          <div className="error typebox">{typeError}</div>
          <Button
            variant="secondary"
            onClick={() => {
              addNewType(newType);
            }}
          >
            Adicionar Tipo
          </Button>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group className="mb-3" controlId="formGridDesc">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={() => {
          let arr = [];
          for (let t in types) {
            arr.push(types[t].name);
          }
          setFormData({ ...formData, type: arr });
        }}>
          Submit
        </Button>
      </Row>
    </Form>
  );
};

export default FormObraText;
