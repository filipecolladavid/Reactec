const Result = () => {
  return (
    <div id="obras">
      <div id="section-container">
        {["Antes", "Durante", "Depois"].map((type) => (
          <div className="section">
            <h3>{type}</h3>
            <div className="images-container" key={`${type}`}>
              <div className="img" id="1"></div>
              <div className="img" id="2"></div>
              <div className="img" id="3"></div>
            </div>
          </div>
        ))}
      </div>
      <div id="description">
        
      </div>
    </div>
  );
};

export default Result;
