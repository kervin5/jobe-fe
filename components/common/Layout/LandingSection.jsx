import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import UserLocator from "@/root/data/UserLocator";
import Title from "@/common/UI/Title";
import SearchForm from "@/components/jobs/Search/SearchForm";
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
      font-size: 2em;
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
      <Grid container>
        <Grid item>
          <Title size="l" alignment={"left"} className="LandingTitle">
            {appText.messages.opportunityOfYourDreams}
          </Title>
        </Grid>
      </Grid>

      <SearchForm location={userLocation.name} />
    </StyledLandingSection>
  );
};

export default LandingSection;
