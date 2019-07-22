import { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const PopUp = props => {
  return (
    props.show && (
      <div className="PopUp">
        <div className="Content">
          <Card>
            <CardHeader
              action={
                <IconButton
                  aria-label="Settings"
                  onClick={() => props.changeHandler(false)}
                >
                  <CloseIcon />
                </IconButton>
              }
              title={props.title || ""}
              subheader={props.subtitle || ""}
            />
            <CardContent>{props.children}</CardContent>
          </Card>
        </div>
        <style jsx>{`
          .PopUp {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgba(0, 0, 0, 0.8);
            z-index: 99;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .Content {
            z-index: 999;
            position: relative;
          }
        `}</style>
      </div>
    )
  );
};

export default PopUp;
