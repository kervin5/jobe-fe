import React from "react";
import variables from "../globalVariables";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Icon from "./Icon";

const CounterCard = ({ icon, label, value, color }) => {
  const Color = color ? "Color" + color : "Color1";
  const iconName = icon ? icon : "Check";

  return (
    <Card className="CounterCard">
      <CardContent>
        <Icon icon={iconName} circle color={color} />
        <h2 className="Label">{label}</h2>
        &nbsp;
        <h2 className={["Value", Color].join(" ")}>{value}</h2>
      </CardContent>
      <style jsx global>{`
        .CounterCard {
          border-radius: 15px;
        }

        .MuiCardContent-root {
          display: flex;
          align-items: center;
          padding: 25px;
        }

        .Label {
          margin-right: 10px;
        }

        .CounterCard .Icon {
          margin-right: 10px;
        }

        .Value.Color1 {
          color: ${variables.accentColor1};
        }

        .Value.Color2 {
          color: ${variables.accentColor2};
        }

        .Value.Color3 {
          color: ${variables.accentColor3};
        }

        .Value.Color4 {
          color: ${variables.darkColor};
        }
      `}</style>
    </Card>
  );
};

export default CounterCard;
