import React from "react";

const DashboardPageHeader = props => {
  return (
    <div className="Header">
      {props.children}
      <style jsx>{`
        .Header {
          display: flex;
          justify-content: space-between;
          flex-direction: row-reverse;
        }
      `}</style>
    </div>
  );
};

export default DashboardPageHeader;
