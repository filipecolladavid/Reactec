import { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import ObraSubmission from "./ObraSubmission";
import ManageSubmissions from "./ManageSubmissions";

const Menu = () => {

    const [key, setKey] = useState('criarObras');
    const [disable, setDisable] = useState(false);

    return (<>
        <Tabs
            defaultActiveKey="criarObras"
            id="uncontrolled-tab-example"
            className="mb-3"
            onSelect={(k) => {
                // 
                setKey(k)
            }}
        >
            <Tab eventKey="criarObras" title="Criar Obras" >
                {key === "criarObras" ? <ObraSubmission setDisable={setDisable} /> : null}
            </Tab>
            {disable ?
                <Tab eventKey="gerirObras" title="Gerir Obras" disabled>
                </Tab>
                :
                <Tab eventKey="gerirObras" title="Gerir Obras" disable>
                    {key === "gerirObras" ? <ManageSubmissions /> : null}
                </Tab>}
        </Tabs>
    </>);
}

export default Menu;