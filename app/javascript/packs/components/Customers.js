import React, { useContext } from "react";
import { NpaContext } from "../Context";

function Customers() {
  const { customers } = useContext(NpaContext);

  return (
    <div>
      <h1>Customers</h1>
    </div>
  );
}

export default Customers;
