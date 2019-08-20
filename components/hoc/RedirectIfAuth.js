import { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { userIsLoggedIn } from "../../data/auth";
import Loader from "../common/UI/Animated/Loader";
import Router from "next/router";

const AUTHORIZE_USER = gql`
  query AUTHORIZE_USER {
    authorize
  }
`;

export default function WithAuth(ComponentToProtect) {
  return class extends Component {
    state = {
      loading: true,
      redirect: false,
      componentToRender: <p>Loading...</p>
    };

    componentDidMount() {
      if (userIsLoggedIn()) {
        Router.push("/dashboard");
      } else {
        this.setState({
          componentToRender: (
            <Query query={AUTHORIZE_USER}>
              {({ data, error, loading }) => {
                if (loading) return <Loader />;
                if (data && data.authorize) {
                  return null;
                }
                if (data && !data.authorize)
                  return <ComponentToProtect {...this.props} />;
                // if(!data.data.authorize) return Router.push("/user/login", "user/login");
                // Router.push("/user/login", "user/login");
                return null;
              }}
            </Query>
          )
        });
      }
    }

    render() {
      return this.state.componentToRender;
    }
  };
}
