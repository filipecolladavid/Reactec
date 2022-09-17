import { useState, useRef } from "react";
import { Spinner } from "react-bootstrap";
const FormObraImg = ({ obraName }) => {
  const type = ["Antes", "Durante", "Depois"];

  const url = "http://0.0.0.0:8000/files/";

  const fileInputRef = useRef();
  const [uploadFiles, setUploadFiles] = useState([]);
  const [uploadType, setUploadType] = useState(type[0]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let data = new FormData();

    for (let i = 0; i < uploadFiles.length; i++) {
      data.append("images", uploadFiles[i], uploadFiles[i].name);
      console.log(data);
    }

    console.log(data);

    const response = await fetch(
      url + uploadType.toLowerCase() + "/" + obraName + "/",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
          mode: "Access-Control-Allow-Origin",
        },
        body: data,
      }
    )
      .then(function (response) {
        if (response.ok) {
          if (type[type.indexOf(uploadType)] + 1 == 3) {
            setDone(true);
          }
          setUploadFiles([]);
          setUploadType(type[type.indexOf(uploadType) + 1]);
          fileInputRef.current.value = null;
          return response.json();
        }
        throw new Error("Something went wrong.", response);
      })
      .then(function (text) {
        console.log("Request successful", text);
        return text;
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
  };

  return (
    <>
      {done ? (
        <>Carregamento concluido</>
      ) : loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <form className="form" id={uploadType} onSubmit={handleSubmit}>
          <h3>{uploadType}</h3>
          <input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={(e) => setUploadFiles(e.target.files)}
          ></input>
          <input type="submit"></input>
        </form>
      )}
    </>
  );
};

export default FormObraImg;
