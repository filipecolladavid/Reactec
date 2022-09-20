import { Spinner } from "react-bootstrap";
import './Obra.css'

const Obra = ({ loading, obra }) => {
  console.log(obra);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="obras">
          <div className="about">
            <h2>{obra.nameDisplayed}</h2>
            <h5>{obra.startDate} - {obra.endDate}</h5>
            <div id="about text">
              <h3>Descrição</h3>
              <div>{obra.desc}</div>
            </div>
            <div id="tipos">
              <h3>Tipos</h3>
              <ul>
                {obra.type.map((type) => {
                  return <li>{type.name}</li>
                })}
              </ul>
            </div>
          </div>
          <div className="photos">
            {["Antes", "Durante", "Depois"].map((type, index) => (
              <div className="section">
                <h3>{type}</h3>
                <div className="images-container" key={`${type}`}>
                  <img className="imgObra" id="1" src={obra.img[index].path[0].name} alt={obra.img[index].path[0].name}></img>
                  <img className="imgObra" id="2" src={obra.img[index].path[1].name} alt={obra.img[index].path[1].name}></img>
                  <img className="imgObra" id="3" src={obra.img[index].path[2].name} alt={obra.img[index].path[2].name}></img>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Obra;
