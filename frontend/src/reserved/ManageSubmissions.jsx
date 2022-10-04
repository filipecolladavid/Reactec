import { useState } from "react";
import { useEffect } from "react";
import { Spinner, Alert } from "react-bootstrap";
import ObrasToManage from "./ObrasToManage";

const ManageSubmissions = () => {

    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        async function fetchData() {
            await fetch("http://0.0.0.0:8000/obras/get-all")
                .then((response) => {
                    if (!response.ok) {
                        throw Error(response.status);
                    }
                    else return response.json();
                })
                .then((data) => {
                    setResponse(data);
                })
                .catch((err) => {
                    setErrorMessage("Algo correu mal: " + err);
                })
            setLoading(false);
        }
        fetchData();
    }, [])


    return (
        <div className="pageContainer">
            {loading
                ?
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                :
                response ? <ObrasToManage /> : <Alert variant="danger">{errorMessage}</Alert>

            }
        </div>
    );
}

export default ManageSubmissions;