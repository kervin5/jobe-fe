import React from "react";
import Title from "../../common/UI/Title";
import Button from "../../common/UI/Button";
import JobsInformationSection from "./JobsInformationSection";
import JobCreator from "../../jobs/JobCreator/JobCreator";

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
          <Button icon="add" click={this.AddNewClickHandler}>
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
