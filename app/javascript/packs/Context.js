import React, { useState, useEffect } from "react";

const NpaContext = React.createContext(null);

function NpaContextProvider(props) {
  const [customers, setCustomers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isUserSignedIn, setIsUserSignedIn] = useState();
  const [isCustomersLoaded, setIsCustomersLoaded] = useState(false);

  console.log(currentUser);

  useEffect(() => {
    fetch("/api/get_user")
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setCurrentUser(response);

        if (response) {
          setIsUserSignedIn(true);
        } else {
          setIsUserSignedIn(false);
        }
      });
  }, []);

  useEffect(() => {
    fetch("/api/customers")
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setCustomers(response.data);
        setIsCustomersLoaded(true);
      });
  }, [isUserSignedIn]);

  const handleSignOut = () => {
    const csrfToken = document.getElementsByName("csrf-token")[0].content;
    fetch("/users/sign_out", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-csrf-token": csrfToken,
      },
    })
      .then((response) => {
        return response;
      })
      .then((response) => {
        setIsUserSignedIn(false);
        setCurrentUser(null);
      });
  };

  return (
    <NpaContext.Provider
      value={{
        customers: customers,
        isUserSignedIn: isUserSignedIn,
        currentUser: currentUser,
        handleSignOut: handleSignOut,
      }}
    >
      {props.children}
    </NpaContext.Provider>
  );
}

export { NpaContext, NpaContextProvider };
