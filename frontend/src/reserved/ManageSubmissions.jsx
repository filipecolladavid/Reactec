import { useState, useEffect } from "react";
import { Spinner, Alert } from "react-bootstrap";
import Result from "../result/Result";

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

    async function handleRemove(id) {
        setLoading(true);
        fetchData();
        alert("Está a remover "+id);
    }

    async function editObra() {

    }

    return (
        <div className="pageContainer">
            {loading
                ?
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                :
                response ? <Result response={response} editable={true} handleClick={editObra} handleRemove={handleRemove}/> : <Alert variant="danger">{errorMessage}</Alert>

            }
        </div>
    );
}

export default ManageSubmissions;