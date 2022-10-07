import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import './Obra.css'

const Photos = ({ obra, type, index }) => {
  console.log(obra.img[index]);
  return (
    <div className="section">
      <h3>{type}</h3>
      <div className="images-container" key={`${type}`}>
        <img className="imgObra" id="1" src={obra.img[index].path[0].name} alt={obra.img[index].path[0].name}></img>
        <img className="imgObra" id="2" src={obra.img[index].path[1].name} alt={obra.img[index].path[1].name}></img>
        <img className="imgObra" id="3" src={obra.img[index].path[2].name} alt={obra.img[index].path[2].name}></img>
      </div>
    </div>);
}

const Obra = ({ loading, obra }) => {

  const [stage, setStage] = useState({ type: "Antes", index: 0 });
  let stageArray = ["Antes", "Durante", "Depois"];

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="obras">
          <div className="about">
            <h2>{obra.nameDisplayed}</h2>
            <br></br>
            <div className="text">
              <h3>Descrição</h3>
              <div>{obra.desc}</div>
              <>Duração: {obra.startDate} - {obra.endDate}</>
            </div>
            <br></br>
            <div className="types">
              <h3>Tipos</h3>
              <ul>
                {obra.type.map((type) => {
                  return <li>{type.name}</li>
                })}
              </ul>
            </div>
          </div>
          <div className="photos">
            <Photos obra={obra} type={stage.type} index={stage.index} />
            <div className="buttons">
              <Button onClick={() => {
                let index = stageArray.indexOf(stage.type);
                index--;
                if (index >= 0) {
                  setStage({ type: stageArray[index], index: index })
                }
              }}>Anterior</Button>

              <Button onClick={() => {
                let index = stageArray.indexOf(stage.type);
                index++;
                if (index < stageArray.length) {
                  setStage({ type: stageArray[index], index: index })
                }
              }}>Próximo</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Obra;
