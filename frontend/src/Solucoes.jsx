import { Tab, Tabs } from "react-bootstrap";

const Solucoes = () => {
    return (
        <div className="sectionContainer">
            <div className="singlePage">
                <Tabs
                    defaultActiveKey="isolamentoTermico"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="isolamentoTermico" title="Isolamento térmico pelo exterior">
                        <div className="tabContent left">
                            <div>
                                <strong>Isolamento térmico pelo exterior</strong>
                            </div>
                            <div>
                                A prestação energética de um edifício, está a tornar-se cada vez mais importante devido, por um lado,
                                às restrições ambientais e ao aumento dos custos de combustível e energia, e por outro devido às alterações climáticas
                                e à necessidade de uma maior eficiência dos isolamentos, para garantir conforto às pessoas.
                                Como revestimento, e de forma isolada, apresenta como desvantagem, apenas um custo mais elevado.
                            </div>
                            <div>
                                <strong>Processo construtivo (muito genericamente). Aplicação de:</strong>
                            </div>
                            <ul>
                                <div>
                                    <li>Adesivo/Barramento</li>
                                    <li>Painel isolante e cavilhas</li>
                                    <li>Perfis metálicos: Arranque e cantos</li>
                                    <li>Adesivo/Barramento e Rede de armadura</li>
                                    <li>Adesivo / Barramento</li>
                                    <li>Primário e Acabamento</li>
                                </div>
                            </ul>
                            <div><strong>As vantagens são muitas:</strong></div>
                            <ul>
                                <div>
                                    <li>Eliminação de pontes térmicas</li>
                                    <li>Eliminação de bolores</li>
                                    <li>Redução dos custos com equipamentos de aquecimento e refrigeração</li>
                                    <li>Inexistência de fissuração futura em fachadas</li>
                                    <li>Acabamento decorativo da superfície, numa vasta gama de cores.</li>
                                </div>
                            </ul>
                        </div>
                    </Tab>
                    <Tab eventKey="barramentoArmado" title="Barramento Armado">
                        <div className="tabContent left">
                            <div><strong>Barramento Armado</strong></div>
                            <div><strong>Processo construtivo (muito genericamente). Aplicação de:</strong></div>
                            <ul>
                                <div>
                                    <li>Adesivo/Barramento</li>
                                    <li>Rede de armadura</li>
                                    <li>Primário</li>
                                    <li>Acabamento</li>
                                </div>
                            </ul>
                            <div ><strong>As vantagens:</strong></div>
                            <ul>
                                <div>
                                    <li>Eliminação de pontes térmicas (algumas)</li>
                                    <li>Eliminação de bolores</li>
                                    <li>Redução dos custos com equipamentos de aquecimento e refrigeração (com pouca expressão)</li>
                                    <li>Inexistência de fissuração futura em fachadas</li>
                                    <li>Acabamento decorativo da superfície, numa vasta gama de cores.</li>
                                </div>
                            </ul>
                        </div>
                    </Tab>
                    <Tab eventKey="impermeabilizacoesCoberturas" title="Impermeabilizações de coberturas">
                        <div className="tabContent left">
                            <div>
                                <strong>Impermeabilizações de coberturas</strong>
                            </div>
                            <div>
                                Existem uma variedade muito significativa de produtos no mercado
                                utilizados para executar impermeabilizações, entre eles, os mais utilizados
                                são as telas asfálticas, as telas em PVC, as telas líquidas e mais recentemente as poliureias.
                            </div>
                            <p>
                                <div>
                                    Uma impermeabilização bem executada vai para além da simples aplicação de produtos.
                                    Aqui, como nos restantes processos que executamos, os pormenores fazem a grande diferença.
                                    A correcta execução nas zonas periféricas, nas ligações às prumadas de saída, nos materiais
                                    escolhidos para os remates e a sua fixação, entre outros, é fundamental.
                                </div>
                            </p>
                        </div>
                    </Tab>
                    <Tab eventKey="reabilitacaoMoradias" title="Reabilitação total de moradias">
                        <div className="tabContent left">
                            <div>
                                <strong>Reabilitação total de moradias</strong>
                            </div>
                            <div>
                                É naturalmente um processo de reabilitação completamente distinto dos restantes,
                                mas muito congratulante. Difere dos anteriores porque a metodologia de abordagem é única,
                                dado que existe de imediato uma invasão da privacidade do cliente, pois é dentro da sua casa que decorre a reabilitação.
                            </div>
                            <div>
                                Imediatamente antes do início da reabilitação, o primeiro desafio é conhecer o que, efectivamente, tem valor para o Cliente;
                                na maior parte das vezes são objectos que não têm valor comercial, mas que têm um valor estimativo colossal.
                                A protecção dos seus bens, principalmente daqueles, torna-se cedo um imperativo.
                            </div>
                            <div>
                                Nestes casos, é natural a existência de um maior envolvimento do cliente no processo da reabilitação;
                                o que é legítimo, nem sempre é fácil, mas é muito interessante - criam-se espaços para temas que em muito
                                ultrapassam aquilo que juntou as partes (Cliente / Reatec).
                            </div>
                            <div>
                                A REATEC não dispõe de conhecimentos técnicos, nem de execução para realizar todas as especialidades.
                            </div>
                            <div>
                                No sentido de proporcionarmos ao Cliente a existência de um único interlocutor,
                                temos vindo a estabelecer parcerias com algumas empresas (poucas) em que depositamos total confiança
                                profissional, subempreitando-lhes esses trabalhos. São exemplos, electricidade, águas e esgotos,
                                sistemas de climatização, sistemas de videovigilância, carpintarias e serralharias.
                            </div>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </div >
    );
}

export default Solucoes;