import React from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import Link from "next/link";

import CircularProgress from "@material-ui/core/CircularProgress";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import MailIcon from "@material-ui/icons/Mail";
import PhoneIcon from "@material-ui/icons/Phone";
import Typography from "@material-ui/core/Typography";

const APPLICANT_INFORMATION_QUERY = gql`
  query APPLICANT_INFORMATION_QUERY($id: String!) {
    application(where: { id: $id }) {
      id
      user {
        id
        name
        email
        phone
      }
    }
  }
`;

const ApplicantInformation = ({ applicationId }) => {
  const { error, loading, data } = useQuery(APPLICANT_INFORMATION_QUERY, {
    variables: { id: applicationId },
  });

  if (loading) return <CircularProgress />;
  return (
    <Card variant="outlined">
    
      <CardContent>
        <Link
          href="/admin/candidates/[cid]"
          as={`/admin/candidates/${data.application.user.id}`}
        >
          <a>
            <Typography color="textSecondary" gutterBottom>
              {data.application.createdAt}
            </Typography>
          </a>
        </Link>
        <Typography variant="h5" component="h2">
          {data.application.user.name}
        </Typography>

        <Typography variant="body2" component="p">
          <MailIcon/> <a href={`mailto:${data.application.user.email}`}>
            <span className="cinema">{data.application.user.email}</span>
          </a>
        </Typography>
        {data.application.user.phone &&<Typography variant="body2" component="p">
          <PhoneIcon/><a href={`tel:${data.application.user.phone}`}>
            <span className="cinema">{data.application.user.phone}</span>
          </a>
        </Typography>}
        <br />
        <Link
        href="/admin/candidates/[cid]"
        as={`/admin/candidates/${data.application.user.id}`}
      >
        <a>Perfil</a>
      </Link>
      </CardContent>
      <CardActions>
        {/* <EempactStatusLabel data={data.application.user.eEmpact} /> */}
      </CardActions>
    </Card>
  );
};

export default ApplicantInformation;
