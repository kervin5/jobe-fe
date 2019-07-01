import { Component } from "react";
import axios from "../../data/api";
import Router from "next/router";

export default function HiddenIfAuth(ComponentToProtect) {
  return class extends Component {
    state = { loading: true, redirect: false };
    componentDidMount() {
      axios({
        url: "/auth",
        method: "get",
        headers: {
          Authorization: window.sessionStorage.getItem("token")
        }
      })
        .then(res => {
          if (res.status !== 200) {
            this.setState({ redirect: true });
          }
          this.setState({ loading: false });
        })
        .catch(err => {
          this.setState({ loading: false, redirect: true });
        });
    }

    render() {
      // return (<ComponentToProtect {...this.props} />);
      const { loading, redirect } = this.state;
      if (loading) {
        return <p>loading</p>;
      } else if (redirect) {
        Router.push("/user/login", "user/login");
        return <p>Redirect</p>;
      } else {
        return (
          <React.Fragment>
            <ComponentToProtect {...this.props} />
          </React.Fragment>
        );
      }
    }
  };
}
