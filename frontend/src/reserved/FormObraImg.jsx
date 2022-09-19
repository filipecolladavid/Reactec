import { useState } from "react";
import FormUpload from "./FormUpload";

const FormObraImg = ({ obraName }) => {
  const type = ["Antes", "Durante", "Depois"];
  const [allDone, setAllDone] = useState(false);
  const [done, setDone] = useState([false, false, false]);

  return (
    <>
      {allDone ? (
        <>Carregamento concluido</>
      ) : (
        <>
          {type.map((uploadType, i) => {
            return (
              <div className="upload container" key={uploadType+"_"+i}>
                <FormUpload obraName={obraName} index={i} uploadType={uploadType} done={done} setDone={setDone} setAllDone={setAllDone} />
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default FormObraImg;
