import React from "react";
import queryString from "query-string";

const Callback = ({ location }) => {
  const query = queryString.parse(location.search);
  console.log(query);
  return (
    <>
      <p>토큰: {query.token}</p>
    </>
  );
};

export default Callback;
