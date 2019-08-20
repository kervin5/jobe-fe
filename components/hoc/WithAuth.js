import { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import LoginForm from "../users/LoginForm/LoginForm";
import Loader from "../common/UI/Animated/Loader";

const AUTHORIZE_USER = gql`
  query AUTHORIZE_USER {
    authorize
  }
`;

export default function WithAuth(ComponentToProtect) {
  return class extends Component {
    render() {
      return (
        <Query query={AUTHORIZE_USER}>
          {({ data, error, loading }) => {
            if (error) return <p>Something went wrong</p>;
            if (loading) return <Loader />;
            if (data.authorize) return <ComponentToProtect {...this.props} />;
            if (!data.authorize) return <LoginForm />;
            // if(!data.data.authorize) return Router.push("/user/login", "user/login");
            // Router.push("/user/login", "user/login");
            return null;
          }}
        </Query>
      );
    }
  };
}
