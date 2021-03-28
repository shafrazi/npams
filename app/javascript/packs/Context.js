import React, { useState, useEffect } from "react";
import AddCustomerForm from "./components/AddCustomerForm";
import AddCorrespondenceForm from "./components/AddCorrespondenceForm";

const NpaContext = React.createContext(null);

function NpaContextProvider(props) {
  const [customers, setCustomers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isUserSignedIn, setIsUserSignedIn] = useState();
  const [isCustomersLoaded, setIsCustomersLoaded] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [ChildComponent, setChildComponent] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [customer, setCustomer] = useState({ attributes: {} });
  const [queryResults, setQueryResults] = useState(customers);
  const [formAction, setFormAction] = useState(null);
  // const [loginCredentials, setLoginCredentials] = useState({ user: {} });

  // const [errorMessage, setErrorMessage] = useState("");

  const requestParams = (method, data) => {
    return {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "X-csrf-token": document.getElementsByName("csrf-token")[0].content,
      },
      credentials: "same-origin",
      body: JSON.stringify(data),
    };
  };

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
        setQueryResults(response.data);
        setIsCustomersLoaded(true);
      });
  }, [isUserSignedIn]);

  const handleSignOut = () => {
    fetch("/users/sign_out", requestParams("DELETE"))
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

  const handleCloseModal = () => {
    setOpenModal(false);
    setCustomer({ attributes: {} });
  };

  const handleClickAddCustomer = () => {
    setOpenModal(true);
    setChildComponent(<AddCustomerForm />);
    setModalTitle("Add customer");
    setFormAction("POST");
  };

  const handleClickAddCorrespondence = (customer) => {
    setOpenModal(true);
    setChildComponent(<AddCorrespondenceForm customer={customer} />);
    setModalTitle("Add correspondence");
  };

  const handleSubmitCustomer = (event, action) => {
    event.preventDefault();
    let url;
    if (action === "POST") {
      url = "/api/customers";
    } else {
      url = `/api/customers/${customer.id}`;
    }

    fetch(url, requestParams(action, customer.attributes))
      .then((response) => {
        response.json();
      })
      .then((response) => {
        setCustomer({ attributes: {} });
        setOpenModal(false);
      });
  };

  const handleChangeAddCustomer = (event) => {
    if (customer.attributes) {
      setCustomer((prevCustomer) => {
        return {
          ...prevCustomer,
          attributes: {
            ...prevCustomer.attributes,
            [event.target.name]: event.target.value,
          },
        };
      });
    }
  };

  const handleClickEditCustomer = (customer) => {
    setOpenModal(true);
    setChildComponent(<AddCustomerForm />);
    setModalTitle("Edit customer");
    setCustomer(customer);
    setFormAction("PATCH");
  };

  return (
    <NpaContext.Provider
      value={{
        customers: customers,
        isUserSignedIn: isUserSignedIn,
        currentUser: currentUser,
        handleSignOut: handleSignOut,
        // loginCredentials: loginCredentials,
        handleChangeLoginForm: handleChangeLoginForm,
        handleSubmitLoginForm: handleSubmitLoginForm,
        // errorMessage: errorMessage,
        isCustomersLoaded: isCustomersLoaded,
        openModal: openModal,
        handleCloseModal: handleCloseModal,
        handleClickAddCustomer: handleClickAddCustomer,
        ChildComponent: ChildComponent,
        modalTitle: modalTitle,
        handleSubmitCustomer: handleSubmitCustomer,
        handleChangeAddCustomer: handleChangeAddCustomer,
        customer: customer,
        queryResults: queryResults,
        handleClickEditCustomer: handleClickEditCustomer,
        formAction: formAction,
        handleClickAddCorrespondence: handleClickAddCorrespondence,
        requestParams: requestParams,
      }}
    >
      {props.children}
    </NpaContext.Provider>
  );
}

export { NpaContext, NpaContextProvider };
