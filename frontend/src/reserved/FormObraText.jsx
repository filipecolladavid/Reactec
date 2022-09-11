import { Col, Row, Button, Form } from "react-bootstrap";
import { useState } from "react";

const FormObraText = ({
  handleSubmit,
  formData,
  setFormData,
  types,
  setTypes,
  typesSelec,
  errorMessage
}) => {
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

  function addNewType(newType) {
    const newArray = types;
    if (newArray.indexOf(newType) === -1 && newType !== "")
      newArray.push(newType);
    setTypes(newArray);
  }

  return (
    <Form className="form" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formGridName">
        <Form.Label>Nome da Obra</Form.Label>
        <Form.Control
          placeholder="Nome a ser exibido"
          onChange={(e) =>
            setFormData({ ...formData, nameDisplayed: e.target.value })
          }
        />
        {errorMessage}
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Distrito</Form.Label>
          <Form.Select
            defaultValue="Distrito"
            onChange={(e) =>
              setFormData({ ...formData, district: e.target.value })
            }
          >
            <option>Selectione a zona</option>
            {distr.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
            <option value="Aveiro">Aveiro</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridType">
          <label htmlFor="start">Start date:</label>
          <input
            type="date"
            id="start"
            name="trip-start"
            min="2010-01-01"
            onChange={(e) =>
              setFormData({ ...formData, startDate: e.target.value })
            }
          ></input>
          <label htmlFor="end">End date:</label>
          <input
            type="date"
            id="end"
            name="trip-end"
            min="2010-01-01"
            onChange={(e) =>
              setFormData({ ...formData, endDate: e.target.value })
            }
          ></input>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGridType">
          <Form.Label>Tipo de Obra</Form.Label>
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
          <Form.Label>Adicione novo tipo</Form.Label>
          <Form.Control
            placeholder="Tipo de Obra"
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="secondary"
          onClick={() => {
            addNewType(newType);
            setNewType("");
          }}
        >
          Adicionar Tipo
        </Button>
        <Form.Group className="mb-3" controlId="textAreaDesc">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
          />
        </Form.Group>
      </Row>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default FormObraText;
