import { useState } from "react";
import { Spinner } from "react-bootstrap";
import Result from "./Result";

const QueryResult = () => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Result />
      )}
    </>
  );
};

export default QueryResult;
