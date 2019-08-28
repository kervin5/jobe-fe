import React from "react";
import { Query } from "react-apollo";
import { Loader } from "semantic-ui-react";
import { AUTHORIZE_USER } from "../hoc/WithAuth";

const RenderIfLoggedOut = ({ children }) => {
  return (
    <Query query={AUTHORIZE_USER}>
      {({ error, loading, data }) => {
        if (error) return <p>Something went wrong</p>;
        if (loading) return <Loader active inline="centered" />;
        return !data.authorize ? (
          <React.Fragment>{children}</React.Fragment>
        ) : null;
      }}
    </Query>
  );
};

export default RenderIfLoggedOut;
