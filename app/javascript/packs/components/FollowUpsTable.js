import React from "react";
import { useState, useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import {
  Button,
  Paper,
  TableContainer,
  TableFooter,
  TablePagination,
  Checkbox,
} from "@material-ui/core";

import { Link } from "react-router-dom";

// import { NpaContext } from "../Context";

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

export default function FollowUpsTable({ followUps, isFollowUpsLoaded }) {
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

  // const { isFollowUpsLoaded, followUps } = useContext(NpaContext);

  return (
    <React.Fragment>
      {isFollowUpsLoaded ? (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Added by</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? followUps.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : followUps
              ).map((followUp) => {
                return (
                  <TableRow hover key={followUp.id}>
                    <TableCell>{followUp.attributes.description}</TableCell>
                    <TableCell>{followUp.attributes.date}</TableCell>
                    <TableCell>
                      <Link
                        to={`/customers/${followUp.attributes.customer_id}`}
                      >
                        {followUp.attributes.customer_name}
                      </Link>
                    </TableCell>
                    <TableCell>{followUp.attributes.username}</TableCell>
                    <TableCell>
                      <Checkbox
                        readOnly
                        checked={followUp.attributes.is_completed}
                        color="primary"
                        size="small"
                        inputProps={{ "aria-label": "primary checkbox" }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPage={rowsPerPage}
                  count={followUps.length}
                  onChangePage={handleChangePage}
                  page={page}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      ) : (
        "Loading...."
      )}
    </React.Fragment>
  );
}
