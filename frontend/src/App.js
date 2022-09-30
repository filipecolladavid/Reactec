// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import {useEffect} from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


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
    </div>
  );
}

export default App;
