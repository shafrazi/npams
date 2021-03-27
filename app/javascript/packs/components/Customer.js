import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Title from "./Title";
import { Card, CardContent, makeStyles, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
      },
    },
  };
});

function Customer() {
  const { id } = useParams();
  const [customerData, setCustomerData] = useState(null);
  const [error, setError] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    axios
      .get(`/api/customers/${id}`)
      .then((response) => {
        setCustomerData(response.data.data);
      })
      .catch((error) => {
        setError("Customer not found.");
      });
  }, []);

  return (
    <div>
      <Title>Customer Details</Title>
      <Card>
        <CardContent>
          {customerData ? (
            <form className={classes.root}>
              <div>
                <TextField
                  name="first_name"
                  label="First name"
                  value={customerData.attributes.first_name}
                  variant="outlined"
                  readOnly={true}
                />
                <TextField
                  name="last_name"
                  label="Last name"
                  value={customerData.attributes.last_name}
                  variant="outlined"
                  readOnly={true}
                />
              </div>
              <div>
                <TextField
                  name="uid"
                  label="UID"
                  value={customerData.attributes.uid}
                  variant="outlined"
                  readOnly={true}
                />
                <TextField
                  name="status"
                  label="Current NPA status"
                  value={customerData.attributes.status}
                  variant="outlined"
                  readOnly={true}
                />
              </div>
            </form>
          ) : (
            error
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Customer;
