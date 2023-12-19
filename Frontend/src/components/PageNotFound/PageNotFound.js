import React from "react";
import PageNotFoundImage from "../../assets/img/PageNotFound.jpg";

const PageNotFound = () => {
  return (
    <div>
      <img
        src={PageNotFoundImage}
        alt="Page Not Found"
        style={{ width: "80%", marginLeft: "10%" }}
      />
    </div>
  );
};

export default PageNotFound;
