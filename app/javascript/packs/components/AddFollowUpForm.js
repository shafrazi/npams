import React, { useState } from "react";
import {
  TextField,
  Button,
  makeStyles,
  DialogActions,
} from "@material-ui/core";

import { KeyboardDatePicker } from "@material-ui/pickers";

import Title from "./Title";
import axios from "axios";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
      },
    },
  };
});

function AddFollowUpForm(props) {
  axios.defaults.headers.common["X-CSRF-TOKEN"] = document.getElementsByName(
    "csrf-token"
  )[0].content;
  const classes = useStyles();

  const { customer } = props;
  const [followUp, setFollowUp] = useState({
    customer_id: customer.id,
    date: new Date(),
  });

  const handleDateChange = (date) => {
    setFollowUp((prevFollowUp) => {
      return {
        ...prevFollowUp,
        date: date,
      };
    });
  };

  const handleChange = (event) => {
    setFollowUp((prevFollowUp) => {
      return {
        ...prevFollowUp,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/follow_ups", followUp)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Title>{`${customer.attributes.first_name} ${customer.attributes.last_name}`}</Title>
      <form className={classes.root} onSubmit={handleSubmit}>
        <div>
          <TextField
            name="description"
            label="Description"
            value={followUp.description || ""}
            variant="outlined"
            onChange={handleChange}
          />

          <KeyboardDatePicker
            autoOk
            disableToolbar
            variant="inline"
            inputVariant="outlined"
            format="yyyy-MM-dd"
            margin="normal"
            id="date"
            label="Date"
            value={followUp.date || new Date()}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </div>

        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
          >
            Submit
          </Button>
        </DialogActions>
      </form>
    </div>
  );
}

export default AddFollowUpForm;
