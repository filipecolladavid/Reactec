import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import InfoObra from "./InfoObra";

const ObraSubmission = () => {
  const [types, setTypes] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://0.0.0.0:8000/obras/get-all-types");
      const data = await response.json();
      const tArray = [];
      for (let t in data) {
        tArray.push(data[t].name);
      }
      setTypes(tArray);
      setLoading(false);
    }
    fetchData();
  }, [setLoading, setTypes]);

  return (
    <div>
      <h1>Criar Obra</h1>
      {loading ? <Spinner /> : <InfoObra types={types} setTypes={setTypes} />}
    </div>
  );
};

export default ObraSubmission;
