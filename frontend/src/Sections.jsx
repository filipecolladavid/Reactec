import { useEffect, useRef, useState } from "react";

import Header from "./Header";
import Reatec from "./Reatec";
import QuemSomos from "./QuemSomos";
import Solucoes from "./Solucoes";
import Obras from "./nossas-vossas-obras/Obras";

const Sections = () => {

    const queryRef = useRef();
    const [isVisible, setIsVisible] = useState();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            let entry = entries[0];
            setIsVisible(entry.isIntersecting);
        });
        observer.observe(queryRef.current);
    });

    useEffect(() => {
        document.body.style.overflow = "hidden";
    }, []);



    return (<>
        <section id="Reatec">
            <Header />
            <div className="content">
                <Reatec />
            </div>
        </section>
        <section id="QuemSomos">
            <div className="content second">
                <QuemSomos />
            </div>
        </section>
        <section id="Solucoes">
            <div className="content second">
                <Solucoes />
            </div>
        </section>
        <section id="Obras" ref={queryRef}>
            <div className="content second">
                {isVisible ? <Obras /> : <></>}
            </div>
        </section>{" "}
    </>);
}

export default Sections;