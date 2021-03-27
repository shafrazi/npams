import React, { useContext } from "react";
import {
  TextField,
  Button,
  makeStyles,
  DialogActions,
} from "@material-ui/core";

import { NpaContext } from "../Context";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
      },
    },
  };
});

function AddCustomerForm() {
  const classes = useStyles();
  const {
    handleSubmitCustomer,
    handleChangeAddCustomer,
    customer,
    formAction,
  } = useContext(NpaContext);

  return (
    <form
      className={classes.root}
      onSubmit={() => {
        handleSubmitCustomer(event, formAction);
      }}
    >
      <div>
        <TextField
          name="first_name"
          label="First name"
          defaultValue={customer.attributes.first_name || ""}
          variant="outlined"
          onChange={handleChangeAddCustomer}
        />
        <TextField
          name="last_name"
          label="Last name"
          defaultValue={customer.attributes.last_name}
          variant="outlined"
          onChange={handleChangeAddCustomer}
        />
      </div>
      <div>
        <TextField
          name="uid"
          label="UID"
          defaultValue={customer.attributes.uid}
          variant="outlined"
          onChange={handleChangeAddCustomer}
        />
        <TextField
          name="status"
          label="Current NPA status"
          defaultValue={customer.attributes.status}
          variant="outlined"
          onChange={handleChangeAddCustomer}
        />
      </div>
      <DialogActions>
        <Button variant="contained" color="primary" size="large" type="submit">
          Submit
        </Button>
      </DialogActions>
    </form>
  );
}

export default AddCustomerForm;
