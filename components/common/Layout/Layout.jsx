import React, { useState } from "react";
import styled from "styled-components";
import Router from "next/router";
import NProgress from "nprogress";
import NavigationBar from "@/common/UI/Navigation/NavigationBar";
import BottomNav from "@/common/UI/Navigation/BottomNav";
import Footer from "./Footer";
import AdminSideMenu from "@/common/UI/Navigation/AdminSideMenu";
import { initGA, logPageView } from "@/lib/analytics";

Router.onRouteChangeStart = () => {
  NProgress.start();
  if (!window.GA_INITIALIZED) {
    initGA();
    window.GA_INITIALIZED = true;
  }
};
Router.onRouteChangeComplete = () => {
  logPageView();
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const StyledLayout = styled.div`
  min-height: 100%;
  width: 100%;
  overflow-x: hidden;
  background-color: ${(props) => props.theme.mutedColorBg};

  main {
    min-height: 100vh;
    padding-top: 60px;
  }
`;

const layout = (props) => {
  const [adminBarIsOpen, setAdminBarIsOpen] = useState(false);
  return (
    <StyledLayout className="Layout">
      {!props.hideNav && !props.admin && <NavigationBar />}
      {!props.hideNav && props.admin && (
        <NavigationBar
          leftHamburgerClickHandler={() => {
            setAdminBarIsOpen(!adminBarIsOpen);
          }}
        />
      )}
      {props.admin && !props.hideNav && (
        <AdminSideMenu
          open={adminBarIsOpen}
          close={() => setAdminBarIsOpen(false)}
        />
      )}
      <main>{props.children}</main>
      <Footer />
      <BottomNav />
    </StyledLayout>
  );
};

export default layout;
