import QueryObras from "./QueryObras";

const Obras = ({setSubmited, handleSubmit}) => {

  return (
    <>
      <div className="top-container">
        <div className="info-box">
          <div className="info-title">
            <h1>Nossas/Vossas Obras</h1>
          </div>
          <div className="info-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
            dignissim vulputate lobortis. Phasellus laoreet, purus sit amet
            porttitor tincidunt, magna quam varius nibh, ut laoreet neque orci a
            orci. Morbi luctus ornare sapien eu porta. Aenean sit amet aliquam
            ligula, quis pharetra mi. Ut sed metus quis nisl suscipit
            sollicitudin. Nunc fringilla tortor rutrum, sagittis nulla eget,
            imperdiet lorem. Nam ut elit ut urna ultrices ullamcorper eu sed
            leo.
          </div>
        </div>
        <div className="query-box">
          <QueryObras handleSubmit = {handleSubmit} />
        </div>
      </div>
    </>
  );
};

export default Obras;
