import React from "react";
import { Link } from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import EventBusyIcon from "@material-ui/icons/EventBusy";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";

const iconStyles = {
  color: "white",
};

export const mainListItems = (
  <div>
    <ListItem button component={Link} to="/">
      <ListItemIcon style={iconStyles}>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>

    <ListItem button component={Link} to="/customers">
      <ListItemIcon style={iconStyles}>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItem>

    <ListItem button component={Link} to="/follow_ups">
      <ListItemIcon style={iconStyles}>
        <AssignmentTurnedInIcon />
      </ListItemIcon>
      <ListItemText primary="Follow-ups" />
    </ListItem>

    <ListItem button component={Link} to="/overdue_follow_ups">
      <ListItemIcon style={iconStyles}>
        <EventBusyIcon />
      </ListItemIcon>
      <ListItemText primary="Overdue follow-ups" />
    </ListItem>

    <ListItem button>
      <ListItemIcon style={iconStyles}>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
  </div>
);
