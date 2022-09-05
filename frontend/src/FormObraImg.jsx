import { useState, useRef } from "react";

const FormObraImg = ({ obraName }) => {
  const type = ["Antes", "Durante", "Depois"];

  const url = "http://127.0.0.1:8000/files/";

  const fileInputRef = useRef();
  const [uploadFiles, setUploadFiles] = useState([]);
  const [uploadType, setUploadType] = useState(type[0]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let data = new FormData();

    for (let i = 0; i < uploadFiles.length; i++) {
      data.append("images", uploadFiles[i],uploadFiles[i].name );
      console.log(data);
    }

    console.log(data);

    const response = await fetch(
      url + uploadType.toLowerCase() + "/"+obraName+"/",
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
        // first then()
        if (response.ok) {
          setUploadFiles([]);
          setUploadType(type[type.indexOf(uploadType) + 1]);
          fileInputRef.current.value = null;
          setLoading(false);
          return response.json();
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
    // console.log(response);
  };

  return (
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
  );
};

export default FormObraImg;
