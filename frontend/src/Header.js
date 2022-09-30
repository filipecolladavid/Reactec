import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {Link, BrowserRouter} from "react-router-dom"

const Header = () => {
  return (
    <header>
        <Navbar bg="light" variant="light" fixed="top" active>
          <Nav className="me-auto" style={{ alignItems: "center" }}>
            <Nav.Link href="#Reatec">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src="logotipoInc.png"
                  alt="logo"
                  style={{ width: "40%" }}
                ></img>
              </div>
            </Nav.Link>
            <Nav.Link href="#Reatec">Home</Nav.Link>
            <Nav.Link href="#QuemSomos">Quem Somos</Nav.Link>
            <Nav.Link href="#Solucoes">Soluções</Nav.Link>
            <Nav.Link href="#Obras">Nossas/Vossas Obras</Nav.Link>
          </Nav>
          <Nav style={{marginRight:"100px"}}>
            <Nav.Item>
              <Nav.Link>
                <Link to="/ReservedArea">Área Reservada</Link>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar>
    </header>
  );
};

export default Header;
