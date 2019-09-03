import WithAuth from "../../components/hoc/WithAuth";
import PageSection from "../../components/common/Layout/PageSection";
import Title from "../../components/common/UI/Title";
import Container from "../../components/common/Layout/Container";
import ResumeUploadForm from "../../components/resumes/ResumeUploadForm";

const MePage = props => {
  return (
    <WithAuth>
      <PageSection className="DashboardPage" column>
        <Container>
          <Title center>Upload Resume</Title>
          <ResumeUploadForm />
        </Container>
      </PageSection>
    </WithAuth>
  );
};

export default MePage;
