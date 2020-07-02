import React from "react";
import { Card } from "semantic-ui-react";
import styled, { keyframes } from "styled-components";
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
  &.danger {
    .card {
      animation: ${dangerGlow} 1s linear infinite alternate;
    }
  }

  .card {
    border-radius: 15px;
    margin-top: 1em;
    margin-bottom: 0 !important;
    width: auto;

    .content {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
    }
  }

  .CounterCard__information {
    display: flex;
    justify-content: center;
    align-items: baseline;
    & > * {
      margin: 0;
    }
  }

  .Icon {
    margin-right: 10px;
  }

  .Value {
    &.Color1 {
      color: ${props => props.theme.accentColor1};
    }

    &.Color2 {
      color: ${props => props.theme.accentColor2};
    }

    &.Color3 {
      color: ${props => props.theme.accentColor3};
    }

    &.Color4 {
      color: ${props => props.theme.darkColor};
    }
  }
`;

const CounterCard = ({ icon, label, value, color, loading, danger }) => {
  const Color = color ? "Color" + color : "Color1";
  const iconName = icon ? icon : "check";

  return (
    <StyledCounterCard className={`CounterCard ${danger ? "danger" : ""}`}>
      <Card>
        <Card.Content>
          <Icon icon={iconName} circle color={color} />
          <div className="CounterCard__information">
            <h2 className="Label">{label}</h2>
            &nbsp;
            <h2 className={["Value", Color].join(" ")}>
              {loading ? 0 : value}
            </h2>
          </div>
        </Card.Content>
      </Card>
    </StyledCounterCard>
  );
};

export default CounterCard;
