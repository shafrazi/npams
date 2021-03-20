import React from "react";
import clsx from "clsx";
import {
  Drawer,
  List,
  makeStyles,
  IconButton,
  Divider,
} from "@material-ui/core";
import { mainListItems, secondaryListItems } from "./listItems";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { NpaContext } from "../Context";

const iconStyles = {
  color: "white",
};

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    drawerPaper: {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      backgroundColor: "#393636",
      color: "white",
    },
    drawerPaperClose: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    },
    toolbarIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar,
    },
    iconButton: {
      color: "white",
    },
  };
});

function SideBar(props) {
  const classes = useStyles();
  const { handleSignOut } = React.useContext(NpaContext);
  const { open, handleDrawerClose } = props;
  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawerClose} className={classes.iconButton}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>{mainListItems}</List>
      <List>
        <ListItem button onClick={handleSignOut}>
          <ListItemIcon style={iconStyles}>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </ListItem>
      </List>
      <Divider style={{ color: "white" }} />
      <List>{secondaryListItems}</List>
    </Drawer>
  );
}

export default SideBar;
