import React from "react";
import Grid from "@material-ui/core/Grid";
import styled, { keyframes } from "styled-components";
import Paper from "@material-ui/core/Paper";
import Icon from "./Icon";

const dangerGlow = keyframes`

  from {
    box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.75);
  }

  to {
    box-shadow: 0px 0px 24px 0px rgba(255,0,0,1);
  }
`;

const StyledCounterCard = styled.div`
  border-radius: 15px;
  margin-top: 1em;
  margin-bottom: 0 !important;

  .Body {
    padding: 15px;
    display: flex;
  }
  &.danger {
    animation: ${dangerGlow} 1s linear infinite alternate;
  }

  .Label {
    text-transform: capitalize;
  }

  .CounterCard__information {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    width: 100%;
  }

  .Icon {
    margin-right: 10px;

    span {
      color: white;
    }
  }

  .Value {
    &.Color1 {
      color: ${(props) => props.theme.accentColor1};
    }

    &.Color2 {
      color: ${(props) => props.theme.accentColor2};
    }

    &.Color3 {
      color: ${(props) => props.theme.accentColor3};
    }

    &.Color4 {
      color: ${(props) => props.theme.darkColor};
    }
  }

  h2 {
    text-decoration: none;
  }
`;

const CounterCard = ({ icon, label, value, color, loading, danger }) => {
  const Color = color ? "Color" + color : "Color1";
  const iconName = icon ? icon : "check";

  return (
    <StyledCounterCard className={`CounterCard ${danger ? "danger" : ""}`}>
      <Paper className="Body">
        <Icon icon={iconName} circle color={color} />

        <div className="CounterCard__information">
          <h2 className="Label">{label}</h2>

          <h2 className={["Value", Color].join(" ")}>{loading ? 0 : value}</h2>
        </div>
      </Paper>
    </StyledCounterCard>
  );
};

export default CounterCard;
