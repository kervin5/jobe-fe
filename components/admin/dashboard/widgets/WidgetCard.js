import React from "react";
import Card from "@/common/UI/Card";
import Title from "@/common/UI/Title";
import styled from "styled-components";

const StyledWidgetCard = styled.div`
  .Card {
    max-height: 300px;
    overflow-y: scroll;
  }
`;

const WidgetCard = ({ children, title }) => {
  return (
    <StyledWidgetCard>
      <Card withBackground>
        <Title level={5}>{title}</Title>
        {children}
      </Card>
    </StyledWidgetCard>
  );
};

export default WidgetCard;
