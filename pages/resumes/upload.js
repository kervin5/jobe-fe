import WithAuth from "../../components/hoc/WithAuth";
import PageSection from "../../components/common/Layout/PageSection";
import Title from "../../components/common/UI/Title";
import Container from "../../components/common/Layout/Container";
import ResumeUploadForm from "../../components/resumes/ResumeUploadForm";
import Button from "../../components/common/UI/Button";
import Link from "next/link";

const ResumeUploadPage = props => {
  return (
    <PageSection className="DashboardPage" column>
      <Container maxWidth="600px">
        <Title center>Upload Resume</Title>
        <p>
          Upload your resume to start aplying to amazing opportunities with one
          click! 😮👉
        </p>
        <ResumeUploadForm />
        <Link href="/me">
          <Button as="a">Do it later 🕑</Button>
        </Link>
      </Container>
    </PageSection>
  );
};

export default WithAuth(ResumeUploadPage);
