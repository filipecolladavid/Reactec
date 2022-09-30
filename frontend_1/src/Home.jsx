import { useState } from "react";

const Home = () => {
  const imgArray = ["2.jpg", "3.jpg", "4.jpg"];
  const [img, setImg] = useState(imgArray[0]);

  function changePic(value) {
    let index = imgArray.indexOf(img);
    if (value) {
      if (index > 0) {
        index--
        setImg(imgArray[index])
      }
    }
    else {
      if (index + 1 < imgArray.length) {
        index++;
        setImg(imgArray[index]);
      }
    }
  }
  return (
    <div className="home">
      <div className="imgContainer">
        <img src="ltarrow.png" className="arrowButton leftButton" alt="clickleftarrow" onClick={() => changePic(true)}></img>
        <img src={img} style={{ maxHeight: "1200px", maxWidth: "1200px" }} alt="images"></img>
        <img src="gtarrow.png" className="arrowButton rightButton" alt="clickrightarrow" onClick={() => changePic(false)}></img>
      </div>
      <div className="phrase">A nossa diferença
        <br></br>
        Está nos pormenores …
      </div>

    </div>)
};

export default Home;
