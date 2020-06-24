import React from "react";
import variables from "../globalVariables";

const Footer = () => {
  return (
    <div className="Footer">
      <nav>
        <a href="https://exactstaff.com/documents/Exact-Staff-Onlline-Privacy-Policy-12-31-19.pdf">
          Privacy Notice
        </a>

        <a href="https://exactstaff.com/exact-staff-inc-cookie-notice">
          Cookie Notice
        </a>
      </nav>
      <p>Copyright &copy; {new Date().getFullYear()} Exact Staff</p>
      <style jsx>{`
        .Footer {
          width: 100%;
          background-color: ${variables.mutedColor2};
          padding: 10px 20px;
          display: flex;
          font-size: 0.9em;
          justify-content: center;
        }

        .Footer nav a {
          color: ${variables.baseTextColor};
          margin-right: 10px;
        }

        .Footer nav a:hover {
          color: ${variables.accentColor3};
        }
      `}</style>
    </div>
  );
};

export default Footer;
