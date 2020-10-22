import RenderIfLoggedIn from "@/components/hoc/RenderIfLoggedIn";
import PageSection from "@/common/Layout/PageSection";
import Title from "@/common/UI/Title";
import Container from "@/common/Layout/Container";
import ResumeUploadForm from "@/components/resumes/ResumeUploadForm";
import appText from "@/lang/appText";

const ResumeUploadPage = (props) => {
  return (
    <RenderIfLoggedIn redirect>
      <PageSection className="DashboardPage">
        <Container maxWidth="600px">
          <Title center>
            {appText.actions.upload} {appText.objects.resume.singular}
          </Title>
          <p>{appText.messages.resume.uploadToApply}! 😮👉</p>
          <ResumeUploadForm />
        </Container>
      </PageSection>
    </RenderIfLoggedIn>
  );
};

export default ResumeUploadPage;
