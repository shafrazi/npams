import React, { useState, useEffect } from "react";

const NpaContext = React.createContext(null);

function NpaContextProvider(props) {
  const [customers, setCustomers] = useState([]);
  const [isCustomersLoaded, setIsCustomersLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/customers")
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        setCustomers(response.data);
        setIsCustomersLoaded(true);
      });
  }, []);

  return (
    <NpaContext.Provider
      value={{
        customers: customers,
      }}
    >
      {props.children}
    </NpaContext.Provider>
  );
}

export { NpaContext, NpaContextProvider };
