import { useState } from "react";
import FormObraText from "./FormObraText";
import FormObraImg from "./FormObraImg";

const InfoObra = ({ types, setTypes }) => {
  const [submited, setSubmited] = useState(false);
  const [typesSelec, setTypesSelect] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [obraName, setObraName] = useState("")

  const [formData, setFormData] = useState({
    nameDisplayed: "",
    startDate: "",
    endDate: "",
    district: "",
    desc: "",
    type: typesSelec,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/obras/create-obra", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        mode: "Access-Control-Allow-Origin",
      },
      body: JSON.stringify(formData),
    })
      .then(function (response) {
        // first then()
        if (response.ok) {
          setSubmited(true);
          return response.json();
        }
        else if(response.status === 400) {
          setErrorMessage("Obra já existe, escolha outro nome")
        }
        throw new Error("Something went wrong.", response);
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

      setObraName(response.name);

      console.log(response);
  }

  return submited ? (
    <FormObraImg obraName={obraName}/>
  ) : (
    <FormObraText
      handleSubmit={handleSubmit}
      formData={formData}
      setFormData={setFormData}
      types={types}
      setTypes={setTypes}
      typesSelec={typesSelec}
      errorMessage={errorMessage}
    />
  );
};

export default InfoObra;
