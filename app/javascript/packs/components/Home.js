import React, { useState, useContext, useEffect } from "react";
import moment from "moment";
import Calendar from "react-calendar";

import FollowUpsTable from "./FollowUpsTable";
import Summary from "./Summary";

import { NpaContext } from "../Context";
import "react-calendar/dist/Calendar.css";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    calendar: {
      width: "100%",
    },
  };
});

function Home() {
  const [date, setDate] = useState(new Date());
  // const [filterEnabled, setFilterEnabled] = useState(false);
  const { followUps, isFollowUpsLoaded } = useContext(NpaContext);
  const [queryResults, setQueryResults] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    setQueryResults((prevQueryResults) => {
      const updatedArray = followUps.filter((item) => {
        return moment(item.attributes.date) <= moment(date)._i;
      });

      return updatedArray;
    });
  }, [date]);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item md={3}>
          <Calendar
            value={date}
            onChange={setDate}
            className={classes.calendar}
          />
        </Grid>
        <Grid item md={9}>
          <Summary />
        </Grid>
        <Grid item md={12}>
          <FollowUpsTable
            followUps={queryResults}
            isFollowUpsLoaded={isFollowUpsLoaded}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
