import WithAuth from "../../components/hoc/WithAuth";
import PageSection from "../../components/common/Layout/PageSection";
import Title from "../../components/common/UI/Title";
import Container from "../../components/common/Layout/Container";
import ResumeUploadForm from "../../components/resumes/ResumeUploadForm";
import variables from "../../components/common/globalVariables";

const MePage = props => {
  return (
    <WithAuth>
      <PageSection className="DashboardPage" column>
        <Container maxWidth="600px">
          <Title center>Upload Resume</Title>
          <p>
            Upload your resume to start aplying to amazing opportunities with
            one click! 😮👉
          </p>
          <ResumeUploadForm />
        </Container>
      </PageSection>
    </WithAuth>
  );
};

export default MePage;
