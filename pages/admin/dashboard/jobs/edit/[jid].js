import { useRouter } from "next/router";
import DashboardPage from "@/components/admin/dashboard/DashboardPage";
import EditJobForm from "@/components/jobs/JobMutation/EditJobForm";
import RenderIfLoggedIn from "@/components/hoc/RenderIfLoggedIn";
// import { getJobsFromAPI } from "@/lib/backend";

const DashboardEditJobPage = props => {
  const router = useRouter();

  const { jid } = router.query;

  return (
    <RenderIfLoggedIn
      redirect
      permissions={[{ object: "JOB", action: "UPDATE" }]}
    >
      <DashboardPage nooverflow maxwidth="920px">
        <EditJobForm jobId={jid} />
      </DashboardPage>
    </RenderIfLoggedIn>
  );
};

// export async function getStaticPaths() {
//   const jobs = await getJobsFromAPI();
//   const jobsPaths = jobs.map((job) => {
//     const jobPath = job.id;
//     return { params: { jid: jobPath } };
//   });
//   return {
//     paths: jobsPaths,
//     fallback: true, // See the "fallback" section below
//   };
// }

// export async function getStaticProps({ params }) {
//   const { jid } = params;
//   return { props: { jid }, unstable_revalidate: 1 };
// }

export default DashboardEditJobPage;
