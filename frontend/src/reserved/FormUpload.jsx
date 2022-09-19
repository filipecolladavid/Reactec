import { useEffect } from "react";
import { useState, useRef } from "react";
import { Spinner, Button } from "react-bootstrap";
const FormUpload = ({ obraName, index, uploadType, setDone, done, setAllDone }) => {
  const url = "http://0.0.0.0:8000/files/";

  const fileInputRef = useRef();
  const [uploadFiles, setUploadFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function checkDone() {
      if (done.includes(false)) return false;
      else return true;
    }
    setAllDone(checkDone());
  }, [done, setAllDone]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log(e.value);

    let data = new FormData();

    for (let i = 0; i < uploadFiles.length; i++) {
      data.append("images", uploadFiles[i], uploadFiles[i].name);
      console.log(data);
    }

    console.log(data);

    setLoading(true);

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
          let arr = [...done];
          arr[index] = true;
          setDone(arr);
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
    console.log(response);
    setLoading(false);
  };
  return (<>

    <h3>{uploadType}</h3>
    {!done[index] ? (
      <form className="form" id={index} key={uploadType} onSubmit={handleSubmit}>
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={(e) => setUploadFiles(e.target.files)}
        ></input>
        <Button type="submit">Submeter</Button>
      </form>
    ) :
      loading ? (
        <Button variant="primary" disabled>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <span className="visually-hidden">Loading...</span>
        </Button>
      ) : (
        <><Button variant="success">✓</Button></>
      )}
  </>
  );
};

export default FormUpload;
