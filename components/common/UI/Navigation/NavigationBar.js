import variables from "@/common/globalVariables";
import Link from "next/link";
import styled from "styled-components";
import NavigationItems from "./NavigationItems/NavigationItems";
import HamburgerMenu from "@/common/UI/Navigation/HamburgerMenu";
const CompanyLogo = "/images/LandingLogo.svg";

const StyledNavigationBar = styled.nav`
  &.NavigationBar {
    display: flex;
    padding: 5px 10px 5px 10px;
    justify-content: space-between;
    background-color: ${variables.mutedColor1};
    position: fixed;
    z-index: 1999;
    left: 0;
    right: 0;
    box-shadow: 0px 0px 6px 1px rgba(0, 0, 0, 0.15);
    align-items: center;

    .CompanyLogo {
      width: 180px;
      margin: auto;
      margin-left: 10px;
      z-index: 10001;
    }

    .menu {
      .item {
        text-transform: capitalize;
      }
    }
  }
`;

const NavigationBar = ({ leftHamburgerClickHandler }) => {
  return (
    <StyledNavigationBar className="NavigationBar">
      {leftHamburgerClickHandler && (
        <HamburgerMenu
          position="static"
          visible
          onClick={leftHamburgerClickHandler}
        />
      )}
      <div className="CompanyLogo">
        <Link href="/">
          <a>
            <img src={CompanyLogo} />
          </a>
        </Link>
      </div>
      <NavigationItems />
    </StyledNavigationBar>
  );
};

export default NavigationBar;
