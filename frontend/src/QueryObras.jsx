import { Form, Button, FloatingLabel } from "react-bootstrap";

const QueryObras = ({ handleSubmit }) => {
  return (
    <Form>
      <h3>Encontre a sua obra</h3>
      <div className="form-box" id="work">
        <h5>Tipo de Obra</h5>
        <Form.Check type="checkbox" id="capoto" label="Capoto" />
        <Form.Check
          type="checkbox"
          id="impremeabilizacao"
          label="Impremeabilizações"
        />
        <Form.Check type="checkbox" id="pladur" label="Pladur" />
        <Form.Check type="checkbox" id="outro" label="Outro" />
        <Form.Check type="checkbox" id="qualquer" label="Qualquer" />
      </div>
      <div className="form-box" id="zone">
        <h5>Zona</h5>
        <FloatingLabel controlId="floatingSelect" label="Zona">
          <Form.Select aria-label="Floating label select example">
            <option>Selectione a zona</option>
            <option value="Aveiro">Aveiro</option>
            <option value="Beja">Beja</option>
            <option value="Braga">Braga</option>
            <option value="Braganca">Bragança</option>
            <option value="CasteloBranco">Castelo Branco</option>
            <option value="Coimbra">Coimbra</option>
            <option value="Evora">Évora</option>
            <option value="Faro">Faro</option>
            <option value="Guarda">Guarda</option>
            <option value="Leiria">Leiria</option>
            <option value="Portalegre">Portalegre</option>
            <option value="Porto">Porto</option>
            <option value="Santarem">Santarém</option>
            <option value="Setubal">Setúbal</option>
            <option value="VianaCastelo">Viana do Castelo</option>
            <option value="VilaReal">Vila Real</option>
            <option value="Viseu">Viseu</option>
          </Form.Select>
        </FloatingLabel>
      </div>
      <div className="form-box" id="submit-btn">
        <Button onClick={handleSubmit}>Submeter</Button>
      </div>
    </Form>
  );
};

export default QueryObras;
