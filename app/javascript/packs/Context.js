import React, { useState, useEffect } from "react";

const NpaContext = React.createContext(null);

function NpaContextProvider(props) {
  const [customers, setCustomers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  // const [isUserSignedIn, setIsUserSignedIn] = useState();
  const [isCustomersLoaded, setIsCustomersLoaded] = useState(false);
  // const [loginCredentials, setLoginCredentials] = useState({ user: {} });

  // const [errorMessage, setErrorMessage] = useState("");

  // useEffect(() => {
  //   fetch("/api/get_user")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((response) => {
  //       setCurrentUser(response);

  //       if (response) {
  //         setIsUserSignedIn(true);
  //       } else {
  //         setIsUserSignedIn(false);
  //       }
  //     });
  // }, []);

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
      credentials: "same-origin",
    })
      .then((response) => {
        return response;
      })
      .then((response) => {
        setIsUserSignedIn(false);
        setCurrentUser(null);
        window.location.href = "/";
      });
  };

  const handleChangeLoginForm = (event) => {
    setLoginCredentials((prevLoginCredentials) => {
      return {
        ...prevLoginCredentials,
        user: {
          ...prevLoginCredentials.user,
          [event.target.name]: event.target.value,
        },
      };
    });
  };

  const handleSubmitLoginForm = (event) => {
    event.preventDefault();
    const csrfToken = document.getElementsByName("csrf-token")[0].content;
    fetch("/api/log_in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-csrf-token": csrfToken,
      },
      body: JSON.stringify(loginCredentials),
      credentials: "same-origin",
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response) {
          setCurrentUser(response);
        } else {
          setErrorMessage("Invalid login credentials!");
        }
      });
  };

  return (
    <NpaContext.Provider
      value={{
        customers: customers,
        isUserSignedIn: isUserSignedIn,
        currentUser: currentUser,
        handleSignOut: handleSignOut,
        loginCredentials: loginCredentials,
        handleChangeLoginForm: handleChangeLoginForm,
        handleSubmitLoginForm: handleSubmitLoginForm,
        errorMessage: errorMessage,
      }}
    >
      {props.children}
    </NpaContext.Provider>
  );
}

export { NpaContext, NpaContextProvider };
