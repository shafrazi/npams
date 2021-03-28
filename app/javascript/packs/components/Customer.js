import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Title from "./Title";
import {
  Card,
  CardContent,
  makeStyles,
  TextField,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Button,
} from "@material-ui/core";

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
  const [dataChanged, setDataChanged] = useState(false);
  const [error, setError] = useState(null);
  const [correspondences, setCorrespondences] = useState([]);
  const classes = useStyles();

  axios.defaults.headers.common["X-CSRF-TOKEN"] = document.getElementsByName(
    "csrf-token"
  )[0].content;

  useEffect(() => {
    axios
      .get(`/api/customers/${id}`)
      .then((response) => {
        setCustomerData(response.data.data);
        setCorrespondences(response.data.data.attributes.correspondences);
        setDataChanged(false);
      })
      .catch((error) => {
        setError("Customer not found.");
      });
  }, [dataChanged]);

  const deleteCorrespondence = (correspondence) => {
    axios
      .delete(`/api/correspondences/${correspondence.id}`)
      .then((response) => {
        setDataChanged(true);
      })
      .catch((error) => {
        setError("Error. The operation was not successful.");
      });
  };

  return (
    <div>
      <Card>
        <CardContent>
          <Title>Customer Details</Title>
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

          {correspondences.length > 0 && (
            <div>
              <Title>Correspondence history</Title>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Remarks</TableCell>
                    <TableCell>Added by</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {correspondences.map((correspondence) => (
                    <TableRow key={correspondence.id}>
                      <TableCell>{correspondence.title}</TableCell>
                      <TableCell>{correspondence.date}</TableCell>
                      <TableCell>{correspondence.remarks}</TableCell>
                      <TableCell>{correspondence.username}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="small"
                          onClick={() => {
                            deleteCorrespondence(correspondence);
                          }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Customer;
