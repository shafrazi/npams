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

    <ListItem button component={Link} to="/insurance_policies">
      <ListItemIcon style={iconStyles}>
        <AssignmentTurnedInIcon />
      </ListItemIcon>
      <ListItemText primary="Insurance policies" />
    </ListItem>

    <ListItem button component={Link} to="/expired_policies">
      <ListItemIcon style={iconStyles}>
        <EventBusyIcon />
      </ListItemIcon>
      <ListItemText primary="Expired policies" />
    </ListItem>

    <ListItem button>
      <ListItemIcon style={iconStyles}>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
    <ListItem button>
      <ListItemIcon style={iconStyles}>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader style={iconStyles} inset>
      Saved reports
    </ListSubheader>
    <ListItem button>
      <ListItemIcon style={iconStyles}>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon style={iconStyles}>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon style={iconStyles}>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);
