import React from "react";
import { Spinner } from "reactstrap";
function Loading() {
  return (
    <div className="mt-5 d-flex justify-content-center">
      <Spinner size="lg" color="primary" children="" />
    </div>
  );
}
export default Loading;
