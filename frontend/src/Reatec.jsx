import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

const Reatec = () => {

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  }

  const path = ["1.jpg", "2.jpg", "3.jpg"]

  return (
    <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
      <Carousel activeIndex={index} onSelect={handleSelect} style={{ width: "75%" }}>
        {path.map((src) => {
          return (
            <Carousel.Item id={src}>
              <img
                className="d-block w-100"
                src={src}
                alt="First slide"
              />
            </Carousel.Item>
          )
        })}
      </Carousel>
      <div className="quotes" style={{ width: "75%", display: "flex", justifyContent: "flex-end", marginTop: "15px" }}>
        A nossa diferença
        <br></br>
        Está nos pormenores …
      </div>
    </div >
  );
}

export default Reatec;

