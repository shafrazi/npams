import React, { useState } from "react";
import {
  TextField,
  Button,
  makeStyles,
  DialogActions,
} from "@material-ui/core";

import Title from "./Title";
import axios from "axios";

import { KeyboardDatePicker } from "@material-ui/pickers";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
      },
    },
  };
});

function AddCorrespondenceForm(props) {
  axios.defaults.headers.common["X-CSRF-TOKEN"] = document.getElementsByName(
    "csrf-token"
  )[0].content;
  const classes = useStyles();

  const { customer } = props;
  const [correspondence, setCorrespondence] = useState({
    customer_id: customer.id,
  });

  const handleChange = (event) => {
    setCorrespondence((prevCorrespondence) => {
      return {
        ...prevCorrespondence,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleDateChange = (date) => {
    setCorrespondence((prevCorrespondence) => {
      return {
        ...prevCorrespondence,
        date: date,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/correspondences", correspondence)
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
            name="title"
            label="Title"
            value={correspondence.title || ""}
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
            value={correspondence.date || new Date()}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </div>
        <div>
          <TextField
            name="remarks"
            label="Remarks"
            value={correspondence.remarks || ""}
            variant="outlined"
            onChange={handleChange}
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

export default AddCorrespondenceForm;
