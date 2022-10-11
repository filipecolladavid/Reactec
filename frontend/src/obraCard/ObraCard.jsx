import { Card, ListGroup } from "react-bootstrap";
import { TiDelete } from "react-icons/ti"
import "./obraCard.css"

const ObraCard = ({ id, imgPath, title, desc, type, startDate, endDate, editable, handleClick, handleRemove }) => {

    const rows = type.reduce(function (rows, key, index) {
        return (index % 2 === 0 ? rows.push([key])
            : rows[rows.length - 1].push(key)) && rows;
    }, []);

    return (
        <div className="cardContainer">
            {editable ?
                <div style={{ display:"flex", justifyContent:"flex-end" }}>
                    <TiDelete style={{ color: "red" }} size={"2em"} onClick={() => handleRemove(id)} />
                </div> :
                <></>}
            <Card onClick={handleClick}>
                <Card.Img variant="top" src={imgPath} />
                <Card.Body>
                    <Card.Title style={{ display: "flex", justifyContent: "center" }}>{title}</Card.Title>
                    <Card.Text style={{ display: "flex", alignItems: "center" }}>
                        <div className="desc">{desc}</div>
                    </Card.Text>
                </Card.Body>
                <Card.Body>
                    <ListGroup className="list-group-flush" style={{ display: "flex", alignItems: "center", width: "100%" }}>
                        {rows.map((row, idx) => (
                            <>
                                {idx > 1 ? <></>
                                    :
                                    <ListGroup.Item>
                                        {row.map((col, index) => (<>{col.name} {(index === 0 && row.length > 1) ? <> | </> : <>{(idx === 1 && rows.length > 2) ? <> ... </> : <></>}</>} </>))}
                                    </ListGroup.Item>
                                }
                            </>
                        ))}
                    </ListGroup>
                </Card.Body>
                <Card.Body>
                    <Card.Text style={{ display: "flex", justifyContent: "center" }}>Duração</Card.Text>
                    <Card.Text style={{ display: "flex", justifyContent: "center" }}> {startDate} até {endDate}</Card.Text>
                </Card.Body>
            </Card >
        </div>
    );
}

export default ObraCard;