import { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { getAuthToken, userIsLoggedIn } from "../../data/auth";
import LoginForm from "../users/LoginForm/LoginForm";
import Loader from "../common/UI/Animated/Loader";
import Router from "next/router";

const AUTHORIZE_USER = gql`
  query AUTHORIZE_USER($token: String!) {
    authorize(token: $token)
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
            <Query query={AUTHORIZE_USER} variables={{ token: getAuthToken() }}>
              {(data, error, loading) => {
                console.log(data);
                if (loading) return <Loader />;
                if (data.data.authorize) {
                  return null;
                }
                if (data.data && !data.data.authorize)
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
