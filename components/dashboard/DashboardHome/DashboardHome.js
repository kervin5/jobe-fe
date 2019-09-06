import React from "react";
import Title from "../../common/UI/Title";
import Button from "../../common/UI/Button";
import JobsInformationSection from "./JobsInformationSection";
import JobCreatorForm from "../../jobs/JobMutation/JobCreatorForm";

class DashboardHome extends React.Component {
  state = {
    addJob: false
  };

  render() {
    return (
      <React.Fragment>
        <div className="Header">
          <Title>Home</Title>
          {this.state.addJob ? (
            <Button click={() => this.setState({ addJob: false })} color="3">
              Cancel
            </Button>
          ) : (
            <Button icon="add" click={() => this.setState({ addJob: true })}>
              Add New
            </Button>
          )}
        </div>
        {this.state.addJob ? <JobCreatorForm /> : <JobsInformationSection />}

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
