import { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { getAuthToken } from "../../data/auth";
import LoginForm from "../users/LoginForm/LoginForm";
import Loader from "../common/UI/Animated/Loader";

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
      this.setState({
        componentToRender: (
          <Query query={AUTHORIZE_USER} variables={{ token: getAuthToken() }}>
            {(data, error, loading) => {
              if (loading) return <Loader />;
              if (data.data.authorize)
                return <ComponentToProtect {...this.props} />;
              if (data.data && !data.data.authorize) return <LoginForm />;
              // if(!data.data.authorize) return Router.push("/user/login", "user/login");
              // Router.push("/user/login", "user/login");
              return null;
            }}
          </Query>
        )
      });
    }

    render() {
      return this.state.componentToRender;
      // const { loading, redirect } = this.state;
      // if (loading) {
      //   return <Loader />;
      // } else if (redirect) {
      //   Router.push("/user/login", "user/login");
      //   return <Loader />;
      // } else {
      //   return (
      //     <React.Fragment>
      //       <ComponentToProtect {...this.props} />
      //     </React.Fragment>
      //   );
      // }
    }
  };
}
