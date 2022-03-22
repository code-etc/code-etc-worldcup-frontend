import React, { useEffect } from "react";
import cookies from "react-cookies";
import { useHistory } from "react-router-dom";

function Logout() {
  const history = useHistory();
  useEffect(() => {
    cookies.remove("access-token");
    cookies.remove("refresh-token");
    history.push("/");
  }, []);
  return <div>Logout</div>;
}

export default Logout;
