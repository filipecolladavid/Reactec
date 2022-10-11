import { useState, useEffect } from "react";
import { Spinner, Alert, Modal, Button } from "react-bootstrap";
import Result from "../result/Result";

const ManageSubmissions = () => {

    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loadingName, setLoadingName] = useState(true);
    const [name, setName] = useState(null);
    const [obraID, setObraID] = useState(null);
    const [show, setShow] = useState(false);
    const [errorModal, setErrorModal] = useState(false);

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
        setResponse(null);
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
        setErrorMessage(null);
        setShow(true);
        setLoadingName(true);
        await fetch("http://0.0.0.0:8000/obras/get-by-id/" + id)
            .then((response) => {
                if (!response.ok) {
                    if (response.status === 404) {
                        setErrorMessage("Essa obra já não existe");
                    }
                    else {
                        setErrorMessage("Alguma coisa correu mal, tente mais tarde");
                    }
                    throw Error(response.status);
                }
                else return response.json();
            })
            .then((data) => {
                setName(data.nameDisplayed);
                setObraID(data.id);
            })
            .catch((err) => {
                console.log(err);
            });
        setLoadingName(false);
        console.log(errorMessage)
    }

    async function removeFromDB() {
        setLoading(true);
        await fetch('http://0.0.0.0:8000/obras/delete/'+obraID)
        .then((response) => {
          if(!response.ok) {
            throw Error(response.status);
          } 
          else {
            setErrorMessage("Obra apagada com sucesso");
          }
        })
        .catch((err) => {
            console.log(err);
            setErrorMessage("Não foi possivel apagar a obra");
            setErrorModal(true);
        })
    }


    const handleCancel = () => {
        if(errorModal) {
            fetchData();
        }
        setErrorMessage(null);
        setShow(false);
        setName(null);
        setObraID(null);
    }

    async function editObra() {

    }

    return (
        <div className="pageContainer">
            {loading ?
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                :
                response ?
                    <>
                        <Modal show={show} onHide={handleCancel}>
                            {loadingName ?
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                                :
                                <>
                                    {errorMessage ?
                                        <Modal.Header closeButton>
                                            <Modal.Title>{errorMessage}</Modal.Title>
                                        </Modal.Header>
                                        :
                                        <>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Remover uma obra</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>Vai remover a obra {name}</Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="danger" onClick={removeFromDB}>
                                                    Remover
                                                </Button>
                                                <Button variant="secondary" onClick={handleCancel}>
                                                    Cancelar
                                                </Button>
                                            </Modal.Footer>
                                        </>
                                    }
                                </>
                            }
                        </Modal>
                        <Result response={response} editable={true} handleClick={editObra} handleRemove={handleRemove} />
                    </>
                    :
                    <Alert variant="danger">{errorMessage}</Alert>

            }
        </div >
    );
}

export default ManageSubmissions;