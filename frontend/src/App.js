// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import { BrowserRouter, Routes, Route} from "react-router-dom";

import ReservedArea from "./reserved/ReservedArea";
import Sections from "./Sections";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Sections />
            }
          />
          <Route path="/ReservedArea" element={<ReservedArea />} />
        </Routes>
      </BrowserRouter>
      {/* <div style={{ alignContent: "center", display: "flex", alignItems:"center", justifyContent: "center"}}>
        <ObraCard 
          imgPath={"./photo_stock.jpeg"} 
          title={"Obra muito fixe"} 
          desc={"Algum texto para complementar o cartão"}
          type={["banana","ananas","joquina","vivenda"]}
          startDate={"20-09-2010"}
          endDate={"20-10-2011"}
          editable={true}
        />
      </div> */}
    </div>
  );
}

export default App;
