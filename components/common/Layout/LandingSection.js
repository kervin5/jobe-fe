import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Grid } from "semantic-ui-react";
import UserLocator from "@/root/data/UserLocator";
import Title from "@/common/UI/Title";
import SearchForm from "@/components/jobs/Search/SearchForm";
import DynamicImageBg from "@/common/UI/DynamicImageBg";
import appText from "@/lang/appText";

const StyledLandingSection = styled.div`
  min-height: 80vh;
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #e7f0ff;
  width: 100%;
  .LandingTitle > * {
    font-size: 6em;
    transition: 100ms;
    @media (max-width: 900px) {
      font-size: 3em;
    }
  }
`;

const LandingSection = () => {
  const [userLocation, setUserLocation] = useState({
    name: null,
    city: null,
    lat: 0,
    lon: 0,
  });

  const userLocator = new UserLocator();

  useEffect(() => {
    userLocator.getLocation().then((res) => {
      setUserLocation(res);
    });
  }, []);

  return (
    <StyledLandingSection className="LandingSection">
      <Grid columns="2">
        <Grid.Row>
          <Grid.Column>
            <Title size="l" alignment={"left"} className="LandingTitle">
              {appText.messages.opportunityOfYourDreams}
            </Title>
          </Grid.Column>
          <Grid.Column></Grid.Column>
        </Grid.Row>
      </Grid>

      <SearchForm location={userLocation.name} />
    </StyledLandingSection>
  );
};

export default LandingSection;
