import { useState, useEffect } from "react";
import { Spinner, Alert } from "react-bootstrap";
import InfoObra from "./InfoObra";

const ObraSubmission = ({setDisable}) => {
  const [types, setTypes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    async function fetchData() {
      await fetch("http://0.0.0.0:8000/obras/get-all-types").then((response) => {
        // first then()
        if (!response.ok) {
          throw Error(response.status);
        }
        else {
          return response.json();
        }
      }).then((data) => {
        const tArray = [];
        for (let t in data) {
          tArray.push({ id: data[t].id, name: data[t].name, selected: false });
        }
        console.log(tArray);
        setTypes(tArray);
      }).catch((err) => {
        console.log(err);
        setErrorMessage("Algo correu mal | " + err);
      })
      setLoading(false);
    }
    fetchData();
  }, [setLoading, setTypes]);

  return (
    <div className="pageContainer">
      {loading ? <Spinner /> : (!types ? <><Alert variant="danger">{errorMessage}</Alert></> : <InfoObra types={types} setTypes={setTypes} setDisable={setDisable}/>)}
    </div>
  );
};

export default ObraSubmission;
