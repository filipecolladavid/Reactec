import './App.css';
import Home from './Home';
import ReservedArea from './reserved/ReservedArea';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ComoFunc from './como-funcionamos/ComoFunc';
import QuemSomos from './quem-somos/QuemSomos';
import ProcConstr from './processos-construtivos/ProcConstr';
import Obras from './nossas-vossas-obras/Obras';
import Contactos from './contactos/Contactos';
import { Nav } from 'react-bootstrap';

function App() {
  return (
    <BrowserRouter>
      <div className='header'>
        <div
          className='img-container'
          style={{ display: 'absolute', right: '10px' }}
        >
          <img
            src='logotipo_cut.png'
            style={{ maxWidth: '500px', maxHeight: '500px' }}
            alt='logo'
          ></img>
        </div>
        <Nav className='justify-content-center'>
          <Nav.Item>
            <Nav.Link>
              <Link to='/'>Home</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to='/quem-somos'>Quem Somos</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to='/como-funcionamos'>Como Funcionamos</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to='/nossas-vossas-obras'>Nossas/Vossas Obras</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to='/contactos'>Contactos</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to='/reserved'>Área Reservada</Link>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
      <div className='content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/como-funcionamos' element={<ComoFunc />} />
          <Route path='/quem-somos' element={<QuemSomos />} />
          <Route path='/processos-construtivos' element={<ProcConstr />} />
          <Route path='/nossas-vossas-obras' element={<Obras />} />
          <Route path='/contactos' element={<Contactos />} />
          <Route path='/reserved' element={<ReservedArea />} />
        </Routes>
      </div>
      <div className='footer'>
        <p>Footer</p>
      </div>
    </BrowserRouter>
  );
}

export default App;
