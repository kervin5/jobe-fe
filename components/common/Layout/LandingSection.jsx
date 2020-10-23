import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import UserLocator from "@/root/data/UserLocator";
import Title from "@/common/UI/Title";
import Image from "@/common/Image";
import SearchForm from "@/components/jobs/Search/SearchForm";
import appText from "@/lang/appText";
const peopleImage = "/images/workers.png";

const StyledLandingSection = styled.div`
  min-height: 100vh;
  padding: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${(props) => props.theme.mutedColorBg};
  position: relative;
  width: 100%;

  .LandingTitle > * {
    font-size: 3em;
    transition: 100ms;
    max-width: 600px;
    @media (max-width: 900px) {
      font-size: 3em;
      margin-bottom: 2rem;
    }

    span {
      color: ${(props) => props.theme.accentColor3};
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    /* background-image: url(${peopleImage}); */
    background-size: cover;
    z-index: 1;

    @media (max-width: 1024px) {
      background-image: none;
    }
  }

  .LandingContent {
    z-index: 2;
  }

  @media (max-width: 1024px) {
    padding: 30px;
  }

  img {
    border-radius: 15px;
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
      <Grid container justify="center" alignItems="center" spacing={9}>
        <Grid item className="LandingContent" md={7} xs={12}>
          <Title level={2} alignment={"left"} className="LandingTitle">
            {appText.messages.opportunityOfYourDreams}
          </Title>
          <SearchForm location={userLocation.name} />
        </Grid>
        <Hidden smDown>
          <Grid item xs md>
            <Image src={peopleImage} />
          </Grid>
        </Hidden>
      </Grid>
    </StyledLandingSection>
  );
};

export default LandingSection;
