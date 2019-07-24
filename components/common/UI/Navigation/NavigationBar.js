import variables from "../../globalVariables";
import Link from "next/link";
import NavigationItems from "./NavigationItems/NavigationItems";
const CompanyLogo = "../../../../static/images/LandingLogo.svg";

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
          padding: 10px;
          justify-content: space-between;
          background-color: ${variables.mutedColor1};
        }

        .CompanyLogo {
          // max-width: 100px;
          width: 180px;
        }
      `}</style>
    </nav>
  );
};

export default NavigationBar;
