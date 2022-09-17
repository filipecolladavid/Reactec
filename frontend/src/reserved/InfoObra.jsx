import { useState } from "react";
import FormObraText from "./FormObraText";
import FormObraImg from "./FormObraImg";

const InfoObra = ({ types, setTypes }) => {
  const [submited, setSubmited] = useState(false);
  const [obraName, setObraName] = useState("");

  return submited ? (
    <FormObraImg obraName={obraName}/>
  ) : (
    <FormObraText
      types={types}
      setTypes={setTypes}
      setSubmited={setSubmited}
      setObraName={setObraName}
    />
  );
};

export default InfoObra;
