import RenderIfLoggedIn from "@/components/hoc/RenderIfLoggedIn";
import PageSection from "@/common/Layout/PageSection";
import Title from "@/common/UI/Title";
import Container from "@/common/Layout/Container";
import ResumeUploadForm from "@/components/resumes/ResumeUploadForm";

const ResumeUploadPage = props => {
  return (
    <RenderIfLoggedIn redirect>
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
    </RenderIfLoggedIn>
  );
};

export default ResumeUploadPage;
