import protectPage from "@/lib/auth";

const WithAuth = (WrappedComponent, permissions, fallbackRoute) => {
  const getOriginalProps =
    WrappedComponent.getInitialProps || (() => ({ auth: true }));

  WrappedComponent.getInitialProps = async context => {
    const OriginalInitialProps = await getOriginalProps(context);
    await protectPage(context, permissions, fallbackRoute);
    return { ...(OriginalInitialProps || {}) };
  };

  return WrappedComponent;
};

export default WithAuth;
