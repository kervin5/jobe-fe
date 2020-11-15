import Link from "next/link";
import styled from "styled-components";
import NavigationItems from "./NavigationItems/NavigationItems";
import HamburgerMenu from "@/common/UI/Navigation/HamburgerMenu";
import useScrollHandler from "../../../../hooks/useScrollHandler";

const CompanyLogo = "/images/oportunica-logo.png";

const StyledNavigationBar = styled.nav`
  &.NavigationBar {
    display: flex;
    padding: 0 10px 5px 10px;
    justify-content: space-between;
    background-color: ${(props) => props.theme.lightColor};
    position: fixed;
    z-index: 100;
    left: 0;
    right: 0;
    box-shadow: ${(props) =>
      props.scrolled ? "0px 0px 6px 1px rgba(0, 0, 0, 0.15)" : "none"};
    align-items: center;

    .CompanyLogo {
      width: 180px;
      margin: auto;
      margin-left: 10px;
      z-index: 10001;
      img {
        width: 100%;
      }
    }

    .menu {
      .item {
        text-transform: capitalize;
      }
    }

    @media (max-width: 640px) {
      background-color: ${(props) => props.theme.lightColor};
      box-shadow: ${(props) => "0px 0px 6px 1px rgba(0, 0, 0, 0.15)"};
    }
  }
`;

const NavigationBar = ({ leftHamburgerClickHandler }) => {
  const scrolled = useScrollHandler();
  return (
    <StyledNavigationBar className="NavigationBar" scrolled={!scrolled}>
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
