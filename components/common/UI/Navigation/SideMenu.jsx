import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Link from "next/link";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CreateIcon from '@material-ui/icons/Create';
import RenderIfLoggedIn from "@/components/hoc/RenderIfLoggedIn";
import appText from "@/lang/appText";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  item: {
    cursor: "pointer"
  }
});

export default function TemporaryDrawer(props) {
  const classes = useStyles();

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
    >
      <List>
        {props.options.map((option, index) => {
          return (
            <RenderIfLoggedIn
              key={option.label + index}
              permissions={option.permissions}
            >
              <Link href={`${option.path}`}  passHref>
                <ListItem as="a" className={classes.item} key={option.label}>
                  <ListItemIcon>
                    { option.icon ? <option.icon /> : <CreateIcon/>}
                  </ListItemIcon>
                  <ListItemText primary={option.label} />
                </ListItem>
              </Link>
            </RenderIfLoggedIn>
          );
        })}
      </List>
      <Divider />
      <List>
        <ListItem button key={appText.objects.perk.plural}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Link href={`/admin/definitions/perks`} passHref>
                <a as="a">{appText.objects.perk.plural}</a>
              </Link>
            }
          />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <Drawer anchor={"left"} open={props.open} onClose={props.close}>
        {list("left")}
      </Drawer>
    </div>
  );
}
