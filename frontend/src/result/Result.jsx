import { Container, Row, Col } from "react-bootstrap";
import ObraCard from "../obraCard/ObraCard";
import "./result.css"

const Result = ({ response, editable, handleClick, handleRemove }) => {
  return (
    <Container style={{width: "fit-content", overflowY:"scroll", overflowX:"hidden", padding:"10px", height:"80vh"}}>
      <Row xs={1} md={3} className="g-4">
        {Array.from(response).map((obra) => (
          <Col>
            <ObraCard
              id={obra.id}
              imgPath={obra.img[2].path[0].name}
              title={obra.nameDisplayed}
              desc={obra.desc}
              type={obra.type}
              startDate={obra.startDate}
              endDate={obra.endDate}
              editable={editable}
              handleClick={handleClick}
              handleRemove={handleRemove}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Result;
