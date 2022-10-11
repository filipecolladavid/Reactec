const TypeSelectBox = ({types, handleUpdateType}) => {
    return (
    <div className="type-container">
        {types.map((type) => {
            let color = type.selected ? "#badbcc" : "#f5c2c7";
            return (
                <div
                    className="type"
                    key={type.id}
                    value={type.name}
                    style={{
                        textAlign: "center",
                        margin: "5px",
                        width: "20%",
                        border: "1px solid #ccc",
                        borderRadius: "5%",
                        backgroundColor: color,
                    }}
                    onClick={(e) => {
                        handleUpdateType(e.currentTarget.getAttribute("value"));
                    }}
                >
                    <strong className="me-auto">{type.name}</strong>
                </div>
            );
        })}
    </div>);
}

export default TypeSelectBox;