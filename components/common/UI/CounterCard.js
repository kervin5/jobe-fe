import React from "react";
import variables from "@/common/globalVariables";
import { Card } from "semantic-ui-react";
import Icon from "./Icon";

const CounterCard = ({ icon, label, value, color, loading }) => {
  const Color = color ? "Color" + color : "Color1";
  const iconName = icon ? icon : "check";

  return (
    <Card className="CounterCard">
      <Card.Content>
        <Icon icon={iconName} circle color={color} />
        <h2 className="Label">{label}</h2>
        &nbsp;
        <h2 className={["Value", Color].join(" ")}>{loading ? 0 : value}</h2>
      </Card.Content>
      <style jsx global>{`
        .CounterCard {
          border-radius: 15px;
          margin-top: 1em;
          margin-bottom: 0 !important;
        }

        .CounterCard .content {
          display: flex;
          align-items: center;
          padding: 25px;
        }

        h2 {
          margin: 0 5px 0 0;
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
