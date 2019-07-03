import React from "react";
import Table from "../../common/UI/Table";
import Title from "../../common/UI/Title";
import axios from "../../../data/api";
import Button from "../../common/UI/Button";
import CounterCard from "../../common/UI/CounterCard";
import JobsInformationSection from "./JobsInformationSection";
import JobCreator from "../../jobs/JobCreator/JobCreator";
import Router from "next/router";

class DashboardHome extends React.Component {
  state = {
    componentToRender: <JobsInformationSection />
  };

  AddNewClickHandler = () => {
    this.setState({ componentToRender: <JobCreator smallHeader /> });
  };

  render() {
    return (
      <React.Fragment>
        <div className="Header">
          <Title>Jobs</Title>
          <Button icon="Add" click={this.AddNewClickHandler}>
            Add New
          </Button>
        </div>
        {this.state.componentToRender}

        <style jsx>{`
          .Header {
            display: flex;
            justify-content: space-between;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default DashboardHome;
