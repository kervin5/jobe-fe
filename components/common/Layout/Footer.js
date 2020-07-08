import React from "react";
import variables from "@/common/globalVariables";

const Footer = () => {
  return (
    <div className="Footer">
      <nav>
        <a href={process.env.NEXT_PUBLIC_PRIVACY_POLICY_LINK}>Privacy Notice</a>

        <a href={process.env.NEXT_PUBLIC_COOKIE_NOTICE_LINK}>Cookie Notice</a>
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
