import protectPage from "../../lib/auth";

const WithAuth = WrappedComponent => {
  const getOriginalProps =
    WrappedComponent.getInitialProps || (() => ({ auth: true }));

  WrappedComponent.getInitialProps = async context => {
    const OriginalInitialProps = await getOriginalProps(context);
    await protectPage(context);
    return { ...(OriginalInitialProps || {}) };
  };

  return WrappedComponent;
};

export default WithAuth;
