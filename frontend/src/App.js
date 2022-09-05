import { useState } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import QueryResult from "./QueryResult";
import ReservedArea from "./ReservedArea";

function App() {
  const [page, setPage] = useState(<Home />);
  const [submited, setSubmited] = useState(false);
  const [pageSize, setPageSize] = useState("97vh");
  function handleSubmit() {
    setSubmited(true);
    setPageSize("100vh");
  }
  return (
    <div className="box">
      <div className="page-container" style={{minHeight:pageSize}}>
        <div className="header">
          <Header
            setPage={setPage}
            setSubmited={setSubmited}
            handleSubmit={handleSubmit}
          />
        </div>
        <div className="content">{page}</div>
      </div>
      {!submited ? (
        <></>
      ) : (
        <div id="content-extra">
          <QueryResult />
        </div>
      )}
      <div className="footer">
        <b>footer</b> (fixed height)
        <button id="reserved" onClick={()=>setPage(<ReservedArea />)}>Area Reservada</button>
      </div>
    </div>
  );
}

export default App;
