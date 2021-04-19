import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Box from "@material-ui/core/Box";
import styled from "styled-components";

import { useQuery } from "@apollo/client";
import ApplicationNotesArea from "./ApplicationNotesArea";
import ApplicantInformation from "./ApplicantInformation";

import ApplicationStatusDropdown from "./ApplicationStatusDropdown";
import OtherApplicationsList from "./OtherApplicationsList";
import { SINGLE_JOB_APPLICATION_QUERY } from "./SingleJobApplication";
import appText from "@/lang/appText";
import Loader from "@/common/UI/Animated/Loader";

const StyledApplicationInformation = styled.div`
  &.ApplicationInformation {
    margin: auto 20px;
    padding: 20px;
    background-color: ${(props) => props.theme.lightColor};
    border-radius: ${(props) => props.theme.roundedRadius};
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19);
    max-width: 350px;
  }

  .Section {
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

export default function ApplicationInformation({ applicationId }) {
  const { error, loading, data } = useQuery(SINGLE_JOB_APPLICATION_QUERY, {
    variables: { id: applicationId },
  });

  if (loading) return <Loader />;
  if (error) return <p>Something failed</p>;

  return (
    <StyledApplicationInformation className="ApplicationInformation">
      <div className="Section">
        <ApplicantInformation applicationId={applicationId} />
      </div>

      <ApplicationInformationTabs application={data.application} />
    </StyledApplicationInformation>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

function ApplicationInformationTabs({ application }) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label={appText.objects.update.plural} {...a11yProps(0)} />
          <Tab
            label={
              "Otras " +
              appText.objects.application.plural
            }
            {...a11yProps(1)}
          />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          {/* <div className="Section">
            <ApplicationStatusDropdown
              applicationId={application.id}
              status={application.status}
            />
          </div> */}
          <div className="Section">
            <ApplicationNotesArea applicationId={application.id} />
          </div>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <OtherApplicationsList
            jobId={application.job.id}
            applicationId={application.id}
          />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
