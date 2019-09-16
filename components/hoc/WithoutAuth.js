import { hidePage } from "../../lib/auth";

const WithoutAuth = WrappedCompoent => {
  WrappedCompoent.getInitialProps = async context => {
    const redirect = true;
    await hidePage(context);
    return { redirect };
  };

  return WrappedCompoent;
};

export default WithoutAuth;
