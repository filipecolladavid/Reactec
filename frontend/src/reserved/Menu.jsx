import { Tabs, Tab } from "react-bootstrap";
import ObraSubmission from "./ObraSubmission";
import ManageSubmissions from "./ManageSubmissions";

const Menu = () => {

    return (<>
        <Tabs
            defaultActiveKey="criarObras"
            id="uncontrolled-tab-example"
            className="mb-3"
        >
            <Tab eventKey="criarObras" title="Criar Obras">
                <ObraSubmission />
            </Tab>
            <Tab eventKey="profile" title="Gerir Obras">
                <ManageSubmissions />
            </Tab>
        </Tabs>
    </>);
}

export default Menu;