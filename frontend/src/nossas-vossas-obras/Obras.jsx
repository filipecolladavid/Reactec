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

  async function handleSubmit(e) {
    e.preventDefault();
    setResponseLoading(true);

    // setObraName(response.name);

    setResponse(response);
    setResponseLoading(false);
  }

  async function handleClick(str) {

    console.log(str);

    const response = await fetch(
      "http://0.0.0.0:8000/obras/get-by-name/" + str
    )
      .then(function (response) {
        // first then()
        if (response.ok) {

        }
        setSubmited(false);
        setErrorMessage("Essa obra já não existe");
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
      setShowObra(true);
      setObra(response);
      setLoading(false);
  }

  return (
    <>
      <h1>Nossas/Vossas Obras</h1>
      {showObra ? (
        <Obra obra={obra} />
      ) : (
        <>
          {!submited ? (
            <div className="box">
              {errorMessage}
              <div className="info-box">
                <div className="info-title"></div>
                <div className="info-text">
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
                <Result response={response} handleClick={handleClick} />
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Obras;
