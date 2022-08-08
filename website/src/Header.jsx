import Nav from "react-bootstrap/Nav";
import Home from "./Home";
import QuemSomos from "./QuemSomos";
import ComoFunc from "./ComoFunc";
import ProcConstr from "./ProcConstr";
import Obras from "./Obras";
import Contactos from "./Contactos";

const Header = ({ setPage, setSubmited, handleSubmit }) => {
  return (
    <>
      <Nav
        className="justify-content-center"
        activeKey="home"
        // onSelect={(selectedKey) => {
        //   switch (selectedKey) {
        //     case "reatec":
        //       setPage(<QuemSomos />);
        //       break;
        //     case "how":
        //       setPage(<ComoFunc />);
        //       break;
        //     case "pc":
        //       setPage(<ProcConstr />);
        //       break;
        //     case "contactos":
        //       setPage(<Contactos />);
        //       break;
        //     default:
        //       setPage(<Home />);
        //       break;
        //   }
        // }}
      >
        <Nav.Item>
          <Nav.Link
            eventKey="home"
            onClick={() => {
              setPage(<Home />);
            }}
          >
            <div className="placeholder-text">Home</div>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="reatec"
            onClick={() => {
              setPage(<QuemSomos />);
            }}
          >
            <div className="placeholder-text">A Reactec</div>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="how"
            onClick={() => {
              setPage(<ComoFunc />);
            }}
          >
            <div className="placeholder-text">Como Funcionamos</div>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="pc"
            onClick={() => {
              setPage(<ProcConstr />);
            }}
          >
            <div className="placeholder-text">Processos Construtivos</div>
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <p></p>
      <Nav className="justify-content-center">
        <Nav.Item>
          <Nav.Link
            eventKey="obras"
            onClick={() => {
              setPage(
                <Obras setSubmited={setSubmited} handleSubmit={handleSubmit} />
              );
            }}
          >
            {" "}
            <div className="placeholder-text">Nossas/Vossas Obras</div>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="contactos"
            onClick={() => {
              setPage(<Contactos />);
            }}
          >
            {" "}
            <div className="placeholder-text">Contactos</div>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};

export default Header;
