import { Card, ListGroup } from "react-bootstrap";

const ObraCard = ({name, nameDisplayed, desc, types, dates, imgPath, handleClick }) => {

  const length = 100;

  function shortText(desc) {
    return desc.substring(0,length) + " ...";
  }
  
  return (
    <Card className="cardObra" key = {name} onClick={() => handleClick(name)}>
      <Card.Img variant="top" src={imgPath} />
      <Card.Body>
        <Card.Title>{nameDisplayed}</Card.Title>
        <Card.Text>{shortText(desc)}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-type">
        {types.map((type) => {
          return <ListGroup.Item key={type.id}>{type.name}</ListGroup.Item>;
        })}
      </ListGroup>
      <ListGroup className="list-group-type">
        <ListGroup.Item>{dates}</ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default ObraCard;
