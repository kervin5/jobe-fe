import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Loader } from "semantic-ui-react";
import { Image, Item } from "semantic-ui-react";
import EempactStatusLabel from "@/components/users/EempactStatusLabel";

const APPLICANT_INFORMATION_QUERY = gql`
  query APPLICANT_INFORMATION_QUERY($id: String!) {
    application(where: { id: $id }) {
      id
      user {
        id
        name
        email
        eEmpact {
          id
          assignments
        }
      }
    }
  }
`;

const paragraph = (
  <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
);

const ApplicantInformation = ({ applicationId }) => (
  <Query query={APPLICANT_INFORMATION_QUERY} variables={{ id: applicationId }}>
    {({ error, loading, data }) => {
      if (loading) return <Loader active inline="centered" />;
      return (
        <Item.Group divided>
          <Item>
            <Item.Content>
              <Item.Header as="a">{data.application.user.name}</Item.Header>
              <Item.Meta>
                <span className="cinema">
                  <a href={`mailto:${data.application.user.email}`}>
                    {data.application.user.email}
                  </a>
                </span>
              </Item.Meta>
              <Item.Extra>
                <EempactStatusLabel data={data.application.user.eEmpact} />
              </Item.Extra>
              {/* <Item.Description>{paragraph}</Item.Description>
            <Item.Extra>
              <Label>IMAX</Label>
              <Label icon='globe' content='Additional Languages' />
            </Item.Extra> */}
            </Item.Content>
          </Item>
        </Item.Group>
      );
    }}
  </Query>
);

export default ApplicantInformation;
