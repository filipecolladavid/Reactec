import { useState } from 'react';
import {BsChevronCompactDown, BsChevronCompactUp} from 'react-icons/bs'
import './QuemSomos.css'

const QuemSomos = () => {

  const arrowArr = [<BsChevronCompactDown size={"3em"}/>, <BsChevronCompactUp size={"3em"}/>]
  const sectionArray = ["#first", "#second"];

  const [arrow, setArrow] = useState(arrowArr[0])
  const [nextSection, setNextSection] = useState(sectionArray[0]);

  function changeSection () {
    let index = sectionArray.indexOf(nextSection);
    if(index===1) {
      setArrow(arrowArr[0]);
      setNextSection(sectionArray[0]);
      window.scrollTo(0, 0);
    }
    else {
      setArrow(arrowArr[1]);
      setNextSection(sectionArray[1]);
    }
  }



  return (
    <>
      <h1>Quem Somos</h1>
      <div className='quemSomos'>
        <section id='first'>
          <div className='left'>
            <div className='text'>A Reatec – Tecnologias de Reabilitação e impermeabilizações, assume-se como especialista em reabilitação</div>
            <ul>
              <div className='text_points'>
                <li>Isolamento térmico pelo exterior (ETICS) / Capoto</li>
                <li>Barramento armado de fachadas</li>
                <li>Impermeabilizações de Coberturas</li>
                <li>Reabilitação Total de Moradias</li>
              </div>
            </ul>

            <div className='text'>
              Temos estrategicamente vindo a focalizar-nos nas diversas  especialidades que estas intervenções implicam
              tendo como objectivo prioritário  a Satisfação dos <strong>Clientes.</strong>
            </div>
            <div className='text'>
              A nossa mão-de-obra é <strong>qualificada</strong> para  assegurar reabilitações com
              <strong>qualidade</strong>, <strong>profissionalismo</strong> e<strong> rigor</strong>.
            </div>
            <div className='text'>
              A experiência tem-nos permitido melhorar  sistematicamente, <strong>inovando</strong>.
              Para nós não há obras iguais e cada cliente é <strong>o Cliente</strong>.
            </div>
            <div className='text'>
              Pela análise das patologias existentes propomos as <strong>melhores  soluções</strong>
              disponíveis, incorporando os materiais que consideramos mais <strong>adequados</strong>.
              Atentos, em especial, aos pontos <strong>sensíveis</strong> das nossas reabilitações e
              aos pormenores  construtivos, asseguramos reabilitações duradouras e que se traduzem na
              <strong>valorização</strong> dos investimentos dos nossos clientes.
            </div>
            <div className='text'>
              Os fornecedores são para nós <strong>parceiros</strong>.
              São  também eles que nos ajudam a estar em constante actualização
              no que respeita à  existência de <strong>novos</strong> produtos ...de soluções <strong>melhoradas</strong>.
            </div>
          </div>
          <div className='right'>
            <img src='QuemSomosObras.jpg' alt='fotos-obras'></img>
          </div>
        </section>
        <section id='saberMais'>
          <br></br>
        </section>
        <div className='arrowContainer'>
        <a href="#saberMais" onClick={changeSection}>{arrow}</a>
        </div>
      </div>
    </>);
};

export default QuemSomos;
