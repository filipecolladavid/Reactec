import ObraCard from "./ObraCard";
import { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useState } from "react";

const Result = ({ response, handleClick }) => {
  const [array, setArray] = useState([]);
  const [imgPath, setImgPath] = useState();



  useEffect(() => {
    let maxRows = Math.ceil(response.length / 3);
    const splitArray = (arr, rows) => {
      const itemsPerRow = Math.ceil(arr.length / rows);
      return arr.reduce((acc, val, ind) => {
        const currentRow = Math.floor(ind / itemsPerRow);
        if (!acc[currentRow]) {
          acc[currentRow] = [val];
        } else {
          acc[currentRow].push(val);
        }
        return acc;
      }, []);
    };
    setArray(splitArray(response, maxRows));
  }, [response]);

  return (
    <Container>
      {array.map((obras) => {
        return (
          <Row>
            {obras.map((obra) => {
              return (
                <Col>
                  <ObraCard
                    name={obra.name}
                    nameDisplayed={obra.nameDisplayed}
                    desc={obra.desc}
                    types={obra.type}
                    dates={obra.startDate + "-" + obra.endDate}
                    imgPath={
                      obra.img[2].path[0].name
                    }
                    handleClick={handleClick}
                  />
                </Col>
              );
            })}
          </Row>
        );
      })}
    </Container>
  );
};

export default Result;
