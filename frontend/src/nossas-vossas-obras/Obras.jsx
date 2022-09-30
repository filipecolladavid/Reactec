import { useState } from "react";
import { Spinner } from "react-bootstrap";
import QueryObras from "./QueryObras";
import Result from "./Result";
import Obra from "./Obra";
import "./obras.css";

const Obras = () => {
  const [submited, setSubmited] = useState(false);
  const [response, setResponse] = useState(null);
  const [responseLoading, setResponseLoading] = useState(true);
  const [showObra, setShowObra] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [obra, setObra] = useState(null);
  const [loading, setLoading] = useState(true);

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   setResponseLoading(true);

  //   // setObraName(response.name);

  //   setResponse(response);
  //   setResponseLoading(false);
  // }

  async function handleClick(str) {

    setLoading(true);

    await fetch(
      "http://0.0.0.0:8000/obras/get-by-name/" + str
    )
      .then((response) => {
        if (!response.ok) {
          setSubmited(false);
          throw new Error("Essa obra já não existe");
        }
        else return response.json();
      })
      .then((data) => {
        setObra(data);
        setShowObra(true);
      })
      .catch((error) => {
        setErrorMessage(error);
        console.log("Request failed: ", error);
      });
    setLoading(false);
  }

  return (
    <div className="sectionContainer">
      <div className="singlePage">
        {showObra ? (
          <Obra obra={obra} />
        ) : (
          <>
            {!submited ? (
              <div className="box">
                {errorMessage}
                <div className="infoBox">
                  <div className="infoTitle"></div>
                  <div className="infoText">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                    dignissim vulputate lobortis. Phasellus laoreet, purus sit
                    amet porttitor tincidunt, magna quam varius nibh, ut laoreet
                    neque orci a orci. Morbi luctus ornare sapien eu porta. Aenean
                    sit amet aliquam ligula, quis pharetra mi. Ut sed metus quis
                    nisl suscipit sollicitudin. Nunc fringilssla tortor rutrum,
                    sagittis nulla eget, imperdiet lorem. Nam ut elit ut urna
                    ultrices ullamcorper eu sed leo.
                  </div>
                </div>
                <QueryObras
                  setSubmited={setSubmited}
                  setResponse={setResponse}
                  setResponseLoading={setResponseLoading}
                />
              </div>
            ) : (
              <>
                {responseLoading ? (
                  <Spinner />
                ) : (
                  <div style={{ display: "flex", alignItems:"center" }}>
                    <div className="arrow" onClick={() => setSubmited(false)}>
                      <img style={{width:"20px"}} src="leftArrow.png"></img>
                      Voltar atrás
                    </div>
                    <Result response={response} handleClick={handleClick} />
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Obras;
