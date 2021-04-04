import { Card, CardContent, Grid } from "@material-ui/core";
import React, { useContext, useState } from "react";

import { NpaContext } from "../Context";

function Summary() {
  const { followUps, currentUserFollowUps } = useContext(NpaContext);

  return (
    <Card>
      <CardContent>
        <h4>Overview</h4>
        <Grid container>
          <Grid item md={4}>
            <p>My upcoming follow-ups</p>
            <p>Upcoming follow-ups of other users</p>
            <p>My unattended overdue follow-ups</p>
            <p>Unattended follow-ups of other users</p>
          </Grid>
          <Grid item md={8}>
            <p>: {currentUserFollowUps.length}</p>
            <p>: 4</p>
            <p>: 4</p>
            <p>: 4</p>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default Summary;
