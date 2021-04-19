import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

import WorkIcon from "@material-ui/icons/Work";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Feed({ events }) {
  const classes = useStyles();
  const eventsToRender = events.map((singleEvent, index) => (
    <ListItem key={"FeeItem" + index}>
      <ListItemAvatar>
        <Avatar>
         {(()=> singleEvent.icon ? <singleEvent.icon /> : <WorkIcon />)()}
        </Avatar>
      </ListItemAvatar>
      {singleEvent.title && <ListItemText primary={singleEvent.title} secondary={singleEvent.date} />}
      {singleEvent.summary && <ListItemText primary={singleEvent.summary} secondary={singleEvent.date}/>}
      {singleEvent.extraText && (
        <ListItemText secondary={singleEvent.extraText} />
      )}
      {singleEvent.meta && <ListItemText secondary={singleEvent.meta} />}
    </ListItem>
  ));
  return <List className={classes.root}>{eventsToRender}</List>;
}
