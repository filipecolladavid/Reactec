const QuemSomos = () => {
    return (
        <div className="sectionContainer">
            <div className="twoColumns">
                <div className="left">
                    <div className="textContainer">
                        <div className="text">A Reatec – Tecnologias de Reabilitação e impermeabilizações, assume-se como especialista em reabilitação</div>
                        <ul>
                            <div className="text_points">
                                <li>Isolamento térmico pelo exterior (ETICS) / Capoto</li>
                                <li>Barramento armado de fachadas</li>
                                <li>Impermeabilizações de Coberturas</li>
                                <li>Reabilitação Total de Moradias</li>
                            </div>
                        </ul>

                        <div className="text">
                            Temos estrategicamente vindo a focalizar-nos nas diversas  especialidades que estas intervenções implicam
                            tendo como objectivo prioritário  a Satisfação dos <strong>Clientes.</strong>
                        </div>
                        <div className="text">
                            A nossa mão-de-obra é <strong>qualificada</strong> para  assegurar reabilitações com <strong>qualidade</strong>, <strong>profissionalismo</strong> e<strong> rigor</strong>.
                        </div>
                        <div className="text">
                            A experiência tem-nos permitido melhorar  sistematicamente, <strong>inovando</strong>.
                            Para nós não há obras iguais e cada cliente é <strong>o Cliente</strong>.
                        </div>
                        <div className="text">
                            Pela análise das patologias existentes propomos as <strong>melhores  soluções</strong>
                            disponíveis, incorporando os materiais que consideramos mais <strong>adequados</strong>.
                            Atentos, em especial, aos pontos <strong>sensíveis</strong> das nossas reabilitações e
                            aos pormenores  construtivos, asseguramos reabilitações duradouras e que se traduzem na
                            <strong>valorização</strong> dos investimentos dos nossos clientes.
                        </div>
                        <div className="text">
                            Os fornecedores são para nós <strong>parceiros</strong>.
                            São  também eles que nos ajudam a estar em constante actualização
                            no que respeita à  existência de <strong>novos</strong> produtos ...de soluções <strong>melhoradas</strong>.
                        </div>
                    </div>
                </div>
                <div className="right">
                    <img src="FotorCreated.jpg" alt="fotos-obras" style={{ width: "100%" }}></img>
                </div>
            </div>
            <div className="bottomSection">
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "15%", marginLeft: "250px" }}>
                    <img src="Foto_Rui.png" alt="foto_rui" style={{ width: "80%", marginTop:"50px" }}></img>
                    <div className="labels">Rui Miguel David</div><div>Sócio Gerente</div>
                </div>
                <div className="quotes" style={{ width: "40%", margin: "120px 15px" }}>
                    "A Reabilitação representa hoje, um investimento significativo para todos nós.
                    Um processo de reabilitação comporta várias fases; identificar a origem de patologias,
                    o melhor processo construtivo a adoptar e os materiais e produtos mais adequados a incorporar
                    são actividades (planeamento) que desde logo condicionam a eficiência de uma reabilitação."
                </div>
            </div>
        </div>
    );
}

export default QuemSomos;