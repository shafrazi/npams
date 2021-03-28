import React from "react";
import { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import {
  Button,
  Paper,
  TableContainer,
  TableFooter,
  TablePagination,
  TextField,
} from "@material-ui/core";

import { Link } from "react-router-dom";

import { NpaContext } from "../Context";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function Customers(props) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const convertClassName = (string) => {
    const newString = string.toLowerCase().split(" ").join("-");
    return newString;
  };

  const {
    isCustomersLoaded,
    queryResults,
    handleClickEditCustomer,
    handleClickAddCorrespondence,
    handleClickAddFollowUp,
  } = useContext(NpaContext);

  return (
    <React.Fragment>
      <Title>Customers</Title>

      {/* <div className={classes.root}>
        <TextField
          name="query"
          label="Enter search criteria"
          variant="outlined"
          value={searchQuery}
          onChange={handleChangeSearch}
          size="small"
        />
        <Button variant="contained" color="primary" onClick={handleClickSearch}>
          Search
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickRefresh}
        >
          Refresh
        </Button>
      </div> */}

      {isCustomersLoaded ? (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>First name</TableCell>
                <TableCell>Last name</TableCell>
                <TableCell>UID</TableCell>
                <TableCell>Status</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? queryResults.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : queryResults
              ).map((customer) => {
                return (
                  <TableRow hover key={customer.id}>
                    <TableCell>{customer.attributes.first_name}</TableCell>
                    <TableCell>{customer.attributes.last_name}</TableCell>
                    <TableCell>
                      <Link to={`/customers/${customer.id}`}>
                        {customer.attributes.uid}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <span
                        className={convertClassName(customer.attributes.status)}
                      >
                        {customer.attributes.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => {
                          handleClickEditCustomer(customer);
                        }}
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => {
                          handleClickAddCorrespondence(customer);
                        }}
                      >
                        Add correspondence
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                        onClick={() => {
                          handleClickAddFollowUp(customer);
                        }}
                      >
                        Add follow-up
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPage={rowsPerPage}
                  count={queryResults.length}
                  onChangePage={handleChangePage}
                  page={page}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
            {/* {modalInsurancePolicy && <EditInsurancePolicy />}
            {modalInsurancePolicy && <RenewalFormModal />} */}
          </Table>
        </TableContainer>
      ) : (
        "Loading...."
      )}
    </React.Fragment>
  );
}
