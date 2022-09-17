import { Col, Row, Button, Form } from "react-bootstrap";
import { useState } from "react";

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
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    nameDisplayed: "",
    startDate: "",
    endDate: "",
    district: "",
    desc: "",
    type: [],
  });

  function handleUpdateType(str) {
    const newTypes = types.map((obj) => {
      if (obj.name === str) {
        return { ...obj, selected: !obj.selected };
      }
      return obj;
    });

    setTypes(newTypes);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let typesToSend = [];
    for (let obj in types) {
      if (types[obj].selected) {
        typesToSend.push(types[obj].name);
      }
    }

    setFormData({ ...formData, type: typesToSend });

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

    setObraName(response.name);

    console.log(response);
  }

  return (
    <Form
      style={{ width: "40rem", paddingTop: "2rem" }}
      onSubmit={handleSubmit}
    >
      <Row>
        <Form.Group>
          <Form.Label>Nome da Obra</Form.Label>
          <Form.Control
            required
            placeholder="Nome a ser exibido"
            onChange={(e) =>
              setFormData({ ...formData, nameDisplayed: e.target.value })
            }
          />
          {errorMessage}
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
          <Form.Group>
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
        <Form.Group>
          <Form.Label>Tipos</Form.Label>
          <div className="type-container">
            {types.map((type) => {
              let color = type.selected ? "#badbcc" : "#f5c2c7";
              return (
                <div
                  className="type"
                  key={type.id}
                  value={type.name}
                  style={{
                    textAlign: "center",
                    margin: "5px",
                    width: "20%",
                    border: "1px solid #ccc",
                    borderRadius: "10%",
                    backgroundColor: color,
                  }}
                  onClick={(e) => {
                    handleUpdateType(e.currentTarget.getAttribute("value"));
                  }}
                >
                  <strong className="me-auto">{type.name}</strong>
                </div>
              );
            })}
          </div>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group>
          <Form.Label>Adicionar Tipo</Form.Label>
          <Form.Control
            placeholder="Tipo de Obra"
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
          />
          <Button
            variant="secondary"
            onClick={() => {
              let max = Math.max(...types.map((max) => max.id));
              console.log(max);
              types.push({ id: null, name: newType, selected: true });
              setNewType("");
            }}
          >
            Adicionar Tipo
          </Button>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group className="mb-3" controlId="textAreaDesc">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Row>
    </Form>
  );
};

export default FormObraText;
