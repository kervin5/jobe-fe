import variables from "../../globalVariables";
import Link from "next/link";
import NavigationItems from "./NavigationItems/NavigationItems";
const CompanyLogo = "/images/LandingLogo.svg";

const NavigationBar = () => {
  return (
    <nav className="NavigationBar">
      <div className="CompanyLogo">
        <Link href="/">
          <a>
            <img src={CompanyLogo} />
          </a>
        </Link>
      </div>
      <NavigationItems />
      <style jsx>{`
        .NavigationBar {
          display: flex;
          padding: 5px 10px 5px 10px;
          justify-content: space-between;
          background-color: ${variables.mutedColor1};
          position: fixed;
          z-index: 1999;
          left: 0;
          right: 0;
          box-shadow: 0px 0px 6px 1px rgba(0, 0, 0, 0.15);
        }

        .CompanyLogo {
          // max-width: 100px;
          width: 180px;
          margin: auto;
          margin-left: 10px;
          z-index: 10001;
        }
      `}</style>
    </nav>
  );
};

export default NavigationBar;
