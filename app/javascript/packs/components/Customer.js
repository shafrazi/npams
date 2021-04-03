import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { NpaContext } from "../Context";

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
  Grid,
  Checkbox,
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
  const [followUps, setFollowUps] = useState([]);
  const [followUp, setFollowUp] = useState(null);
  const classes = useStyles();

  const { setIsFollowUpsChanged } = useContext(NpaContext);

  axios.defaults.headers.common["X-CSRF-TOKEN"] = document.getElementsByName(
    "csrf-token"
  )[0].content;

  useEffect(() => {
    axios
      .get(`/api/customers/${id}`)
      .then((response) => {
        setCustomerData(response.data.data);
        setCorrespondences(response.data.data.attributes.correspondences);
        setFollowUps(response.data.data.attributes.follow_ups);
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

  const updateFollowUp = (event, followUp) => {
    axios.defaults.headers.common["X-CSRF-TOKEN"] = document.getElementsByName(
      "csrf-token"
    )[0].content;

    followUp.is_completed = event.target.checked;

    axios
      .patch(`/api/follow_ups/${followUp.id}`, followUp)
      .then((response) => {
        setFollowUps((prevFollowUps) => {
          const updatedFollowUps = prevFollowUps.filter((item) => {
            return item.id !== followUp.id;
          });
          return [...updatedFollowUps, followUp].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA;
          });
        });
        setIsFollowUpsChanged(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item md={5}>
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
        </Grid>
        <Grid item md={7}>
          <Card>
            <CardContent>
              <Title>Follow ups</Title>

              {followUps.length > 0 && (
                <div>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Description</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Added by</TableCell>
                        <TableCell>Is completed?</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {followUps.map((thisFollowUp) => (
                        <TableRow key={thisFollowUp.id}>
                          <TableCell>{thisFollowUp.description}</TableCell>
                          <TableCell>{thisFollowUp.date}</TableCell>
                          <TableCell>{thisFollowUp.username}</TableCell>
                          <TableCell>
                            <Checkbox
                              checked={thisFollowUp.is_completed}
                              color="primary"
                              inputProps={{ "aria-label": "primary checkbox" }}
                              onChange={(event) => {
                                updateFollowUp(event, thisFollowUp);
                              }}
                            />
                          </TableCell>
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
        </Grid>
      </Grid>
    </div>
  );
}

export default Customer;
