import { Container, CardGroup, Card, ListGroup } from "react-bootstrap";
import { useState } from "react";

const Result = ({ response, handleClick }) => {
  
  const length = 100;

  return (
    <Container>
      <CardGroup>
        {response.map((obra) => {
          console.log(obra);
          return (
            <Card className="cardObra" key={obra.name} onClick={() => handleClick(obra.name)}>
              <Card.Img variant="top" className="image" src={obra.img[2].path[0].name} />
              <Card.Body>
                <Card.Title>{obra.nameDisplayed}</Card.Title>
                <Card.Text>{obra.desc.substring(0, length) + " ..."}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-type">
                {(obra.type).map((type) => {
                  return <ListGroup.Item key={type.id}>{type.name}</ListGroup.Item>;
                })}
              </ListGroup>
              <ListGroup className="list-group-type">
                <ListGroup.Item>{obra.startDate} / {obra.endDate}</ListGroup.Item>
              </ListGroup>
            </Card>
          );
        })}
      </CardGroup>
    </Container>
  );
};

export default Result;
